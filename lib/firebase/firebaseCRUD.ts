import { Reception } from "@/template/reception";
import { db } from "../firebase/firebaseConfig";
// type
import { NoticeType } from "@/template/notice";
// firebase
import {
  orderBy,
  query,
  collection,
  getDocs,
  limit,
  addDoc,
  Timestamp,
} from "firebase/firestore";

const getCollection = (collectionName: "notices" | "reception" | "test") =>
  collection(db, collectionName);

//Create
//임 시
export const setNotices = async (notice: NoticeType) => {
  try {
    const res = await addDoc(getCollection("notices"), {
      notice,
    });
  } catch (error) {
    console.log(error);
  }
};

export const submitReception = async (reception: Reception) => {
  try {
    const res = await addDoc(getCollection("reception"), { reception });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const submitTest = async () => {
  try {
    const res = await addDoc(getCollection("test"), { abc: 123 });
    return res;
  } catch (error) {
    console.log(error);
  }
};

function sortNotices(data: NoticeType[]): NoticeType[] {
  return data.sort((a, b) => {
    if (a.important && !b.important) {
      return -1;
    }
    if (!a.important && b.important) {
      return 1;
    }

    return b.timestamp.toMillis() - a.timestamp.toMillis();
  });
}

//Read All
export const ReadAllData = async (collectionName: string) => {
  try {
    const res = await getDocs(getCollection("notices"));
    if (res.size) {
      const allDocs: NoticeType[] = [];
      res.forEach((doc) => {
        allDocs.push({
          ...(doc.data().notice as NoticeType),
          id: doc.id,
        });
      });
      const sorted_arr = sortNotices(allDocs);
      return sorted_arr;
    } else {
      throw new Error("Could not fetch document");
    }
  } catch (error) {
    console.log(error);

    console.log(`error Occured on firebaseCRUD: ${error}`);
  }
};

// Update

// Delete

// 예씨 데이터 넣기
