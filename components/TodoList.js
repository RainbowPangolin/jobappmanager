import {useState} from 'react';

export default function TodoList(){
	const [listItems, setListItems] = useState(testData);
	
	function handleListAddItem(newItem) {
		setListItems((prevListItems) => {
			return [...prevListItems, newItem];
		});
	}

	function handleListReplaceItem(id, newItem) {
		let newList = [...listItems];
		newList[id] = newItem;
		setListItems(newList);
	}

	function handleListDeleteItem(id) {
		let newList = [...listItems];
		newList.splice(id,1);
		setListItems(newList);
	}

	for (let i = 0; i < listItems.length; i++){
		listItems[i].id = i;
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
			);
		}
	);
    
	return(
		<>
			<TodoItemAdder itemAdder={handleListAddItem} numItemsInList={listItemsAsElements.length}/>
			<ul>{listItemsAsElements}</ul>
		</> 
        
	);

}

function TodoItemAdder({    
	itemAdder, 
	numItemsInList
}){

	const [itemTitle, setItemTitle] = useState('');
	// const [itemDesc, setItemDesc] = useState('');

	let newItem = {
		id: numItemsInList,
		title: itemTitle,
		// description: itemDesc,
		timestamp: 'timestamp2',
		isdone: true
	};

	return(
		<>
			<input 
				id="title"
				value={itemTitle}
				onChange={
					(event) => {
						setItemTitle(event.target.value); 
					}
				}></input>
			{/* <input 
				id="description"
				value={itemDesc}
				onChange={
					(event) => {
						setItemDesc(event.target.value); 
					}
				}></input> */}
			<button onClick={() => {itemAdder(newItem);}}>ADD ITEM</button>
		</>
	);
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
	);
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
			handleListReplaceItem(id, item);
			setEditMode();
		} catch (e){
			alert(e);
		}
	};

	const handleDeleteCallback = () => {
		handleListDeleteItem(item.id);
	};
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
						<SetIsDoneButton/>

						{item.title}, 
						{/* {item.description},  */}
						{item.timestamp},
						<EditButton setEditModeHandler={setEditMode}/>
						<DeleteButton handleDeleteCallback={handleDeleteCallback}/>
					</span>
			}
            
		</>
	);
}

function EditItemField({item, confirmEditHandler}){
	const [itemTitle, setItemTitle] = useState('');
	const [itemDesc, setItemDesc] = useState('');

	let newItem = {
		id: item.id,
		title: itemTitle,
		description: itemDesc,
		timestamp: 'timestampEdited',
		isdone: true
	};

	const handleEdit = () => {
		confirmEditHandler(item.id, newItem);

	};

	return(
		<>
			<input 
				id="title"
				value={itemTitle}
				onChange={
					(event) => {
						setItemTitle(event.target.value); 
					}
				}></input>
			<input 
				id="description"
				value={itemDesc}
				onChange={
					(event) => {
						setItemDesc(event.target.value); 
					}
				}></input>
			<button onClick={handleEdit}>CONFIRM EDIT</button>
		</>
	);
}

function EditButton({setEditModeHandler}){
	return(
		<button onClick={setEditModeHandler}>Edit</button>
	);
}

function DeleteButton({handleDeleteCallback}){
	return(
		<button onClick={handleDeleteCallback}>Delete</button>
	);
}
function SetIsDoneButton(){
	return(
		<button>SetDone</button>
	);
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
}];
