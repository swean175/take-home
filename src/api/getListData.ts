import {useState, useEffect} from "react";
import { useQuery } from "@tanstack/react-query";
import mockJson from "./mock.json";
import { useStore } from "../store";


export type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};



// export type DeletedListItem = Omit<ListItem, "decription">;

// useDeletedListData returns deleted cards

export const useDeletedListData = () => {
  const deletedCards = useStore((state) => state.deletedCards);
  const [data, setData] = useState(deletedCards);

  useEffect(() => {
    setData(deletedCards);
  },[deletedCards]);

  const query = useQuery({
    queryKey: ["deletedList"],
    queryFn: async () => {
      await sleep(100);

      const mockData = mockJson as Omit<ListItem, "isDeleted">[];
      return mockData.map((item) => {
        return { ...item, isDeleted: data.includes(item.id)  ? true : false };
      });
    },
  });

  return query;
};


// useGetListData does not return deleted cards
export const useGetListData = () => {

  const deletedCards = useStore((state) => state.deletedCards);  
  const query = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      await sleep(1000);

      if (getRandom() > 85) {
        console.error("An unexpected error occurred! The random number was bigger than 85");
        throw new Error("👀");
      }

      const mockData = mockJson as Omit<ListItem, "isVisible">[];

      return shuffle(mockData).map((item) => {
        let show
        if (deletedCards.includes(item.id)) {
          show = false
        } else {
          show = true
        }
        return { ...item, isVisible: getRandom() > 50 && show ? true : false };
      });
    },
  });

  return query;
};

const getRandom = () => Math.floor(Math.random() * 100);

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffle = <T extends any[]>(array: T): T => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
