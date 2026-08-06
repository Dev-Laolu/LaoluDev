import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { workItems as initialSeedData } from "../data/workData";

const COLLECTION_NAME = "portfolio";

/**
 * Normalizes category names between portfolio backend & public frontend filters
 */
export const normalizeCategory = (cat) => {
  if (!cat) return "Graphic";
  const c = cat.toLowerCase();
  if (c.includes("graphic") || c.includes("brand") || c.includes("logo") || c.includes("ui")) return "Graphic";
  if (c.includes("video") || c.includes("motion")) return "Video";
  if (c.includes("code") || c.includes("dev")) return "Code Project";
  if (c.includes("data") || c.includes("analytics")) return "Data Analysis";
  if (c.includes("research")) return "Research Work";
  return cat;
};

/**
 * Fetches all portfolio items from Firestore. Fallback to initialSeedData if empty, offline, or locked by security rules.
 */
export const getPortfolioItems = async () => {
  try {
    const portfolioRef = collection(db, COLLECTION_NAME);
    const q = query(portfolioRef, orderBy("year", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return initialSeedData;
    }

    const items = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        normalizedCategory: normalizeCategory(data.category),
        year: Number(data.year) || 2026,
      };
    });

    return items;
  } catch (error) {
    if (error.code === 'permission-denied') {
      console.info("Firestore Rules Notice: Read permissions locked on 'admin-f6876'. Using seed data.");
    } else {
      console.warn("Firestore fetch notice, using fallback data:", error.message);
    }
    return initialSeedData;
  }
};

/**
 * Creates a new portfolio item in Firestore
 */
export const addPortfolioItem = async (itemData) => {
  try {
    const portfolioRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(portfolioRef, {
      ...itemData,
      year: Number(itemData.year) || new Date().getFullYear(),
      featured: Boolean(itemData.featured),
      tags: Array.isArray(itemData.tags) ? itemData.tags : [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    if (error.code === 'permission-denied') {
      throw new Error("Firestore Permission Error: Please update your Firestore Security Rules in Firebase Console to allow write operations.");
    }
    throw error;
  }
};

/**
 * Updates an existing portfolio item in Firestore
 */
export const updatePortfolioItem = async (id, updatedData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updatedData,
      year: Number(updatedData.year) || new Date().getFullYear(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    if (error.code === 'permission-denied') {
      throw new Error("Firestore Permission Error: Update your Firestore Security Rules in Firebase Console to allow write operations.");
    }
    throw error;
  }
};

/**
 * Deletes a portfolio document by ID
 */
export const deletePortfolioItem = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    if (error.code === 'permission-denied') {
      throw new Error("Firestore Permission Error: Update your Firestore Security Rules in Firebase Console to allow delete operations.");
    }
    throw error;
  }
};

/**
 * Toggles featured status of an item
 */
export const toggleFeaturedItem = async (id, currentStatus) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      featured: !currentStatus,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    if (error.code === 'permission-denied') {
      throw new Error("Firestore Permission Error: Update your Firestore Security Rules in Firebase Console to allow edit operations.");
    }
    throw error;
  }
};
