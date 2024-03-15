import { db } from "@/services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { chartSingle } from "./charts";

export const chartRequest = {
  async createChart(chart: Record<string, any>) {
    await setDoc(doc(db, "charts", chart.id), chart)
      .then(() => {
        chartSingle.moveToPublished(chart.id);
        window.location.href = `/chart/${chart.id}`;
      })
      .catch((err) => alert("Error: " + err.message));
  },

  async getChart(id: string) {
    const docRef = doc(db, "charts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  },
};
