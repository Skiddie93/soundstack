import { db } from "@/services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { chartSingle } from "./charts";

export const chartRequest = {
  async createChart(chart: Record<string, any>) {
    const req = await setDoc(doc(db, "charts", chart.id), chart)
      .then(() => {
        chartSingle.moveToPublished(chart.id);
        window.location.href = `/chart/${chart.id}`;
        setTimeout(() => {
          window.location.href = `/chart/${chart.id}`;
        }, 2000);

        return {
          success: true,
          message: "Successfully published. Redirecting...",
        };
      })
      .catch((err) => {
        return { success: false, message: err.message };
      });

    return req;
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
