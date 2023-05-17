import {useState} from "react"

export default function TodoList(){

    const [listItems, setListItems] = useState(testData)

    function handleListAdd() {
        setListItems((prevListItems) => {
            const newItem = {
                id: prevListItems.length,
                title: `title ${prevListItems.length}`,
                description: 'description',
                timestamp: 'timestamp',
                isdone: true
            }
            return [...prevListItems, newItem];
        })
    }

    const listItemsAsElements = listItems.map(
        (item) => {
            return(
                <li key={item.id}>
                    <TodoItemContainer item={item}/>
                </li>
            )
        }
    )

    console.log(listItemsAsElements)

    return(
        <>
            <TodoItemAdder itemAdder={handleListAdd}/>
            <ul>{listItemsAsElements}</ul>
        </> 
        
    )

}

function TodoItemAdder({itemAdder}){
    return(
        <>
        <input id="title"></input>
        <input id="description"></input>
            <button onClick={itemAdder}>ADD ITEM</button>
        </>
    )
}

function TodoItemContainer({item}){
    return(
        <div>
            <TodoItem item={item}/>
        </div>
    )
}

function TodoItem({item}){
    const isDone = item.isdone
    return(
        <div>
            {item.title}, 
            {item.description}, 
            {item.timestamp}
            <EditButton/>
            <DeleteButton/>
            <SetIsDoneButton/>
        </div>
    )
}

function EditButton(){
    return(
        <button>Edit</button>
    )
}

function DeleteButton(){
    return(
        <button>Delete</button>

    )
}
function SetIsDoneButton(){
    return(
        <button>SetDone</button>
    )
}

const testData = [{
    id: 0,
    title: 'title',
    description: 'description',
    timestamp: 'timestamp',
    isdone: false
}, {
    id: 1,
    title: 'title1',
    description: 'description2',
    timestamp: 'timestamp2',
    isdone: true
}]