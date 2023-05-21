import {useState} from "react"

export default function TodoList(){

    const [listItems, setListItems] = useState(testData)

    function handleListAdd(newItem) {
        setListItems((prevListItems) => {
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
            <TodoItemAdder itemAdder={handleListAdd} numItemsInList={listItemsAsElements.length}/>
            <ul>{listItemsAsElements}</ul>
        </> 
        
    )

}

function TodoItemAdder({itemAdder, numItemsInList}){
    const [itemTitle, setItemTitle] = useState('')
    const [itemDesc, setItemDesc] = useState('')

    let newItem = {
        id: numItemsInList,
        title: itemTitle,
        description: itemDesc,
        timestamp: 'timestamp2',
        isdone: true
    }

    const handleChange = (event) => {
        setItemTitle(event.target.value)
    }

    return(
        <>
            <input 
                id="title"
                value={itemTitle}
                onChange={
                    (event) => {
                        setItemTitle(event.target.value) 
                    }
                }></input>
            <input 
                id="description"
                value={itemDesc}
                onChange={
                    (event) => {
                        setItemDesc(event.target.value) 
                    }
                }></input>
            <button onClick={() => {itemAdder(newItem)}}>ADD ITEM</button>
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
    const [editMode, setEditState] = useState(false);
    const [isDone, setIsDone] = useState(item.isdone);

    function setEditMode(){
        if(editMode){
            setEditState(false);
        } else {
            setEditState(true);
        }
    }
    return(
        <>
            {
                editMode ? 
                <>
                    <EditItemField setEditModeHandler={setEditMode}/>
                </>:
                <span>
                    {item.description}, 
                    {item.timestamp},
                    <EditButton setEditModeHandler={setEditMode}/>
                    <DeleteButton/>
                    <SetIsDoneButton/>
                </span>
            }
            
        </>
    )
}

function EditItemField({setEditModeHandler, setItemHandler}){
    return(
        <>
        <input 
            id="title"
            ></input>
        <input 
            id="description"
            ></input>
        <button onClick={setEditModeHandler}>CONFIRM</button>
    </>
    )
}

function EditButton({setEditModeHandler}){
    return(
        <button onClick={setEditModeHandler}>Edit</button>
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
