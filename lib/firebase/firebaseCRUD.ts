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
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();
const getCollection = (collectionName: "notices" | "reception" | "test") =>
  collection(db, collectionName);
export const getStorageRef = (refName: string) => ref(storage, refName);

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

export const uploadMP3File = async (
  fileName: string,
  file: File | null,
): Promise<string | null> => {
  if (!file) return null;
  const fileRef = getStorageRef(fileName);
  const metadata = {
    contentType: "audio/mpeg",
  };
  let fileURL: string;
  try {
    await uploadBytes(fileRef, file, metadata);
    fileURL = await getDownloadURL(fileRef);
    console.log(fileURL);
    return fileURL;
  } catch (error) {
    console.log(error);
    return null;
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

//Read

function sortNotices(data: NoticeType[]): NoticeType[] {
  return data.sort((a, b) => {
    if (a.important && !b.important) {
      return -1;
    }
    if (!a.important && b.important) {
      return 1;
    }

    return b.timeStamp.getSeconds() - a.timeStamp.getSeconds();
  });
}

export const getAllNotices = async () => {
  try {
    const res = await getDocs(getCollection("notices"));
    // console.log(res.docs[0].data().reception)
    const datas: NoticeType[] = res.docs.map((doc) => {
      const { timestamp } = doc.data().notice;
      return { ...doc.data().notice, timeStamp: timestamp.toDate() };
    });
    const sorted_arr = sortNotices(datas);
    return sorted_arr;
  } catch (error) {
    console.log(error);

    console.log(`error Occured on firebaseCRUD: ${error}`);
  }
};

export const getAllReception = async (): Promise<Reception[]> => {
  try {
    const res = await getDocs(getCollection("reception"));
    // console.log(res.docs[0].data().reception)
    const datas: Reception[] = res.docs.map((doc) => {
      const { timestamp } = doc.data().reception;
      return { ...doc.data().reception, timestamp: timestamp.toDate() };
    });
    // console.log(datas)
    return datas;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Update
export const updateViewCount = async (id: string) => {
  try {
    const res = await updateDoc(doc(db, "notices", id), {
      "notice.viewCount": increment(1),
    });
    console.log("증가 잘됨");
  } catch (error) {
    console.log("Error updating view Count", error);
  }
};

// Delete

// 예시 데이터 넣기
