import {  useEffect, useState } from "react";
import { ListItem, useGetListData} from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { Button, ToggleButton} from "./Buttons";
import { useStore, useDeletion } from "../store";
import ShowUnwanted from "./ShowUnwanted";


/**
 * The main entrypoint component of the application.
 *
 * It fetches the list of cards from the API and displays them.
 * It also displays the number of deleted cards and provides a button to reveal them.
 * It also provides a button to refresh the list of cards and generic toggle button.
 */
export const Entrypoint = () => {
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const listQuery = useGetListData();
  const numOfDeletedCards = useStore((state) => state.numOfDeletedCards);
  const [deletedId, setDeletedId] = useState<number>(0);
  const { addToDeleted} = useDeletion();
  const reveal = useStore((state) => state.reveal);
  const setReveal = useStore((state) => state.setReveal);


  useEffect(() => {
    if (listQuery.isLoading) {
    return;
    }
    setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading]);


  useEffect(() => {
    if (deletedId > 0) {
    addToDeleted(deletedId);
    }

  }, [deletedId]);


/** 
 * Toggles the reveal state, which determines whether deleted cards are shown.
 */

  function handleReveal(){  
    setReveal() 
  }

/**
 * Refetches the list data to refresh the visible cards after pressing the "Refresh" button.
 */
  function handleRefresh() {
    listQuery.refetch();
  }


  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">My Awesome List ({visibleCards.length})</h1>
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card) => (
            <Card key={card.id} id={card.id} title={card.title} description={card.description} delId={setDeletedId}/>
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg text-center">Deleted Cards ({numOfDeletedCards})</h1>
          <Button
            className={"text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1 ml-1"}
            onClick={handleReveal}
            >
            Reveal
          </Button>
          <Button
            className={"text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1 ml-1"}
            onClick={handleRefresh}
            >
            Refresh
          </Button>

          
          <ToggleButton>
              Toggle
              </ToggleButton>
        </div>
        <div className="flex flex-col gap-y-3 bg-red-300 trnsition duration-300 mt-2 p-2">
          <span className="mb-1 font-medium text-xl text-center text-slate-100 font-extrabold">Unwanted</span>
          {  
            reveal && <ShowUnwanted 
            numOfDeletedCards={numOfDeletedCards}/>
          }
        </div>
      </div>
    </div>
  );
};
