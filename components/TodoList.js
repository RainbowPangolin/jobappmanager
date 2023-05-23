import {useState} from "react"

export default function TodoList(){

    const [listItems, setListItems] = useState(testData)

    function handleListAddItem(newItem) {
        setListItems((prevListItems) => {
            return [...prevListItems, newItem];
        })
    }

    function handleListReplaceItem(id, newItem) {
        let newList = [...listItems];
        newList[id] = newItem;
        setListItems(newList);
    }

    function handleListDeleteItem(newItem) {
        console.log('del')
    }

    const listItemsAsElements = listItems.map(
        (item) => {
            return(
                <li key={item.id}>
                    <TodoItemContainer 
                        item={item}
                        handleListReplaceItem={handleListReplaceItem}
                        handleListDeleteItem={handleListDeleteItem}
                    />
                </li>
            )
        }
    )

    console.log(listItemsAsElements)

    return(
        <>
            <TodoItemAdder itemAdder={handleListAddItem} numItemsInList={listItemsAsElements.length}/>
            <ul>{listItemsAsElements}</ul>
        </> 
        
    )

}

function TodoItemAdder({    
                            itemAdder, 
                            numItemsInList
                        }){

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

function TodoItemContainer({
    item,
    handleListReplaceItem, 
    handleListDeleteItem
}){
    return(
        <div>
            <TodoItem 
                item={item}
                handleListReplaceItem={handleListReplaceItem}
                handleListDeleteItem={handleListDeleteItem}
            />
        </div>
    )
}

function TodoItem({
    item,
    handleListReplaceItem, 
    handleListDeleteItem
}){

    const [editMode, setEditState] = useState(false);


    function setEditMode(){
        if(editMode){
            setEditState(false);
        } else {
            setEditState(true);
        }
    }

    const confirmEdit = (id, item) => {
        try{
            handleListReplaceItem(item.id, item)
            setEditMode();
        } catch (e){
            alert(e)
        }
    }
    return(
        <>
            {
                editMode ? 
                <>
                    <EditItemField 
                        item={item}
                        confirmEditHandler={confirmEdit}
                        // handleListReplaceItem={handleListReplaceItem}
                    />
                </>:
                <span>
                    {item.title}, 
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

function EditItemField({item, confirmEditHandler, handleListReplaceItem}){
    const [itemTitle, setItemTitle] = useState('')
    const [itemDesc, setItemDesc] = useState('')

    let newItem = {
        id: item.id,
        title: itemTitle,
        description: itemDesc,
        timestamp: 'timestampEdited',
        isdone: true
    }

    const handleEdit = () => {
        confirmEditHandler(item.id, newItem)
        console.log(`ID ${item.id} ITEM`, newItem)

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
            <button onClick={handleEdit}>CONFIRM EDIT</button>
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
