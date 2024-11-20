import {useState, useEffect} from "react";
import { Spinner } from "./Spinner";
import { useStore } from "../store";
import { ListItem, useDeletedListData } from "../api/getListData";
import { Card } from "./List";

/**
 * showUnwanted displays the number of deleted cards, and their titles and an empty description.
 * The component fetches the list of deleted cards from the useDeletedListData hook and displays them after the
 * fetching is done.
 * If the number of cards in the list is not equal to the number of deleted cards, the component displays
 * a list of so far collected deleted cards, if the query is loading, the component displays
 * a spinner instead. If the number of cards is equal to the number of deleted cards, the component
 * displays all deleted cards.
 */
export default function showUnwanted({numOfDeletedCards}: {numOfDeletedCards: number}) {

    const showDeleted = useDeletedListData();
    const [showDeletedCards, setShowDeletedCards] = useState<ListItem[]>([]);
    const deletedCards = useStore((state) => state.deletedCards);


    useEffect(() => {
        showDeleted.refetch();
        if (showDeleted.isLoading) {
        return;
        }
        setShowDeletedCards(showDeleted.data?.filter((item) => item.isDeleted) ?? []);
    }, [showDeleted.data, showDeleted.isLoading, deletedCards, numOfDeletedCards]);


    if (showDeletedCards.length == numOfDeletedCards && showDeletedCards.length > 0) {
        return (
            <>{showDeletedCards.map((item) =>{
                return <Card key={item.id} id={item.id} title={item.title} description={""} delId={() => {}}/>})
            }</> 
        )
    } else if (showDeleted.isLoading ){
        return (<Spinner />)
    }  else {
        return  <>{showDeletedCards.map((item) =>{
            return <Card key={item.id} id={item.id} title={item.title} description={""} delId={() => {}}/>})
        }</> 
    }
}
