import { create } from "zustand";
import { useState } from "react";

type State = {
    reveal: boolean;
    numOfDeletedCards : number;
    expanded: number[];
    deletedCards: number[]
};

type Actions = {
    addNumOfDel: () => void;
    subNumOfDel: () => void;
    setReveal: () => void;
    isExpanded: (id: number) => void;
    isNotExpanded: (id: number) => void;
    setDeletedCards: (id: number) => void
    revertDeleted: (id: number) => void
};

export const useStore = create<State & Actions>((set) => ({
  numOfDeletedCards: 0,
  reveal: false,
  expanded: [],
  deletedCards: [],
  setDeletedCards: (id: number) => set((state) => ({ deletedCards: [...state.deletedCards, id] })),
  revertDeleted: (id: number) => set((state) => ({ deletedCards: state.deletedCards.filter((item) => item !== id) })),
  addNumOfDel: () => set((state) => ({ numOfDeletedCards: state.numOfDeletedCards + 1 })),
  subNumOfDel: () => set((state) => ({ numOfDeletedCards: state.numOfDeletedCards - 1 })),
  setReveal: () => set((state) => ({ reveal: !state.reveal })),
  isExpanded: (id: number) => set((state) => ({ expanded: [...state.expanded, id] })),
  isNotExpanded: (id: number) => set((state) => ({ expanded:  state.expanded.filter((item) => item !== id) })),
}));



  /**
   * This hook provides functions to add and remove an id from the list of deleted cards,
   * and to check if a card is deleted.
   *
   *    An object with the following properties:
   * - `addToDeleted`: A function that adds an id to the list of deleted cards.
   * - `deleted`: A boolean indicating if the card is deleted.
   * - `setDeleted`: A function that sets the deleted state.
   * - `takeFromDeleted`: A function that removes an id from the list of deleted cards.
   */
export const useDeletion = () => {
  const [deleted, setDeleted] = useState(false);
  const toBeDeleted = useStore((deletedCards) => deletedCards.setDeletedCards);
  const toBeReverted = useStore((deletedCards) => deletedCards.revertDeleted);
  
  function addToDeleted(id: number) {
    return  toBeDeleted(id);
  }

  function takeFromDeleted(id: number) {
    return  toBeReverted(id);
  }

  return { addToDeleted, deleted, setDeleted, takeFromDeleted }
}


  /**
   * This hook provides functions to add and remove an id from the list of expanded cards,
   * and to check if a card is expanded.
   *
   *    An object with the following properties:
   * - `addExpanded`: A function that adds an id to the list of expanded cards.
   * - `removeExpanded`: A function that removes an id from the list of expanded cards.
   */
export const useExpansion = () => {

  const toBeAdded = useStore((expanded) => expanded.isExpanded);
  const toBeRemoved = useStore((expanded) => expanded.isNotExpanded);
  const expanded = useStore((state) => state.expanded);
  function addExpanded(id: number){
    console.log('id added from expanded in store'+id)
  return toBeAdded(id)
  }

  function removeExpanded(id: number){
    if (expanded.includes(id))
      console.log('id removed from expanded in store '+id)
  return toBeRemoved(id)
  }

  return { addExpanded, removeExpanded }
}
