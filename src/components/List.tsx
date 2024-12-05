import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import { ListItem, useDeletedListData } from "../api/getListData";
import { Button } from "./Buttons";
import { ChevronUpIcon, ChevronDownIcon, XMarkIcon, RevertIcon } from "./icons";
import { useStore, useDeletion, useExpansion } from "../store";



type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
  id: ListItem["id"];
  delId: Dispatch<SetStateAction<number>>; 
  key: ListItem["id"]
};


export const Card: FC<CardProps> = ({ id, title, description, delId }) => {

  const addDeletedCards = useStore((numOfDeletedCards) => numOfDeletedCards.addNumOfDel);
  const subDeletedCards = useStore((numOfDeletedCards) => numOfDeletedCards.subNumOfDel);
  const deletedCards = useStore((state) => state.deletedCards);
  const {deleted, setDeleted, takeFromDeleted} = useDeletion();
  const [isExpanded, setIsExpanded] = useState(false);
  const { addExpanded, removeExpanded } = useExpansion();
  const expandedCards = useStore((state) => state.expanded);
  const showDeleted = useDeletedListData();




  useEffect(() => {
    if (expandedCards.includes(id)){ 
    setIsExpanded(true)
    }else {
    setIsExpanded(false)
  };
  }, [expandedCards])


  /**
   * Toggles the expansion state of the card. If the card is expanded, it adds the id to the list of expanded cards.
   * If the card is not expanded, it removes the id from the list of expanded cards.
   */

  function handleExpansion() {
    if (isExpanded) {
      removeExpanded(id)
    } else {
      addExpanded(id)
    }

  }

  /**
   * Sets the deleted state of the card to true
   * addDeletedCards: Adds 1 to the number of deleted cards declared in store.ts.
   *  delId: Sets deleted card id in parent component.
   */
  function handleDelete() {
    setDeleted(true);
    addDeletedCards();
    delId(id);
}

/**
 * Reverts the deletion of the card by removing the card's id from the deleted list and subtracting 1 from the number of deleted cards
 * and updating the deleted state to false.
 * the button is disabled
 */
function handleRevert(){
  subDeletedCards();
  takeFromDeleted(id);
  showDeleted.refetch();
  setDeleted(false);
}

// If the card is deleted, display the title in red
// If the card is not deleted but is in the deleted list, display the title in red and with revert button insted of other buttons 
// If the card is not deleted and is not in the deleted list, display the title in black with oher buttons

if (deleted) {
  return (
    <div className="border border-black px-2 py-1.5 transiton-color bg-red-200">
    <div className="flex justify-between mb-0.5 ">
      <h1 className="font-medium">{title}</h1>
    </div>
  </div>
  )
} else if (deletedCards.includes(id)) {
  return (
    <div className="border border-black px-2 py-1.5 bg-red-200">
    <div className="flex justify-between mb-0.5">
      <h1 className="font-medium">{title}</h1>
 
      <Button
            className={"text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"}
            onClick={handleRevert}
            disabled
            >
            <RevertIcon />
          </Button>
    </div>
  </div>
  ) 
} else
  return (
    <div className="border border-black px-2 py-1.5 transition-colors hover:bg-gray-200 transition-opacity delay-75">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <Button onClick={handleExpansion} className={"animate-pulse "}>
            {isExpanded ? <ChevronUpIcon />:  <ChevronDownIcon />}
          </Button>
          <Button onClick={handleDelete} >
            <XMarkIcon />
          </Button>
        </div>
      </div>
    { isExpanded && <p className="text-sm">{description}</p>}
    </div>
  );
};
