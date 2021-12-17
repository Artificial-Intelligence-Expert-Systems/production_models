import axios from "axios";
import React, {useEffect, useState} from "react";
import {
    MDBInput,
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBListGroup,
    MDBListGroupItem,
    MDBIcon,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody
} from 'mdb-react-ui-kit';
import Loader from "react-loader-spinner";

const baseUrl = 'http://localhost:5000';

const MainPage = () => {
    const [facts, setFacts] = useState(null);

    // region Tasks

    useEffect(async () => {
        debugger;
        const response = await axios.get(`${baseUrl}/api/fact/get_all`);
        debugger;
    }, []);

    // const chooseTask = (taskId) => {
    //     setActiveTask(taskId);
    //     getBestInterface(taskId);
    // }

    // const createTask = () => {
    //     changeTaskName('');
    //     createNewTask(currentTaskName).then((task) => {
    //         chooseTask(task.id);
    //     })
    // }
    //
    // const removeTaskHandler = (event, taskId) => {
    //     event.stopPropagation();
    //     removeTask(taskId).then(() => {
    //         if (activeTask === taskId) {
    //             chooseTask(tasks[0].id);
    //         }
    //     });
    // }

    // const editTask = (event, task) => {
    //     if (task.id === activeTask) {
    //         event.stopPropagation();
    //     }
    //     setTaskEditing(task);
    // }

    // endregion Tasks

    return (
        <MDBContainer className='p-3'>
            {/*<CreateForm create={{*/}
            {/*    action: createTask,*/}
            {/*    buttonText: 'Создать задачу'*/}
            {/*}}>*/}
            {/*    <MDBInput*/}
            {/*        value={currentTaskName}*/}
            {/*        onChange={(e) => changeTaskName(e.target.value)}*/}
            {/*        id='taskCreation' type='text' label='Введите название задачи'/>*/}
            {/*</CreateForm>*/}

            {/*<hr style={{ width: '100%', color: 'black', height: '1px', backgroundColor: 'black' }} />*/}

            <MDBRow className='pt-3 justify-content-between'>
                <MDBCol size='md-5'>
                    <h1>Существующие факты</h1>
                    <ListGroup list={facts}/>
                </MDBCol>
                {/*<MDBCol size='md-6'>*/}
                {/*    <h3 className='pt-2'>Лучший интерфейс</h3>*/}
                {/*    <InterfaceCard bestInterface={bestInterface} loading={taskLoader || interfaceLoader}/>*/}
                {/*</MDBCol>*/}
            </MDBRow>

            {/*<TaskModal setTaskEditing={setTaskEditing}*/}
            {/*           task={taskEditing}*/}
            {/*           interfaces={interfaces}*/}
            {/*           removeInterface={removeInterface}*/}
            {/*           attachInterface={attachInterface}*/}
            {/*           getInterfaces={getInterfaces}*/}
            {/*/>*/}
        </MDBContainer>
    )
};

export const ListGroup = ({ list, clickHandler }) => {
    return (
        <MDBListGroup style={{ minWidth: '22rem' }}>
            {
                list.map((item) => (
                    <div onClick={() => clickHandler(item.id)} key={item.id}>
                        <MDBListGroupItem>
                            <MDBRow className='justify-content-between'>
                                <MDBCol size='md-9'>{ item.name }</MDBCol>
                            </MDBRow>
                        </MDBListGroupItem>
                    </div>
                ))
            }
        </MDBListGroup>
    )
}

// export const CreateForm = ({ children, create, size }) => {
//     return (
//         <MDBRow>
//             <MDBCol size={size || 'md-4'}>
//                 { children }
//             </MDBCol>
//             <MDBBtn className={`${create.size || 'col-md-2'} me-2`}
//                     style={ create.style || { height: '100%' } }
//                     onClick={() => create.action()}>
//                 { create.buttonText }
//             </MDBBtn>
//         </MDBRow>
//     )
// }

//
// export const InterfaceCard = ({bestInterface, loading}) => {
//     if (loading) return <p className='lead'>
//         Загрузка задачи...
//     </p>
//
//     if (bestInterface) {
//         return (
//             <div className="card">
//                 <div className="card-body">
//                     <h5 className="card-title">Card title</h5>
//                     <p className="card-text">
//                         Some quick example text to build on the card title and make up the bulk of the
//                         card's content.
//                     </p>
//                     <button type="button" className="btn btn-primary">Button</button>
//                 </div>
//             </div>
//         );
//     }
//
//     return <p className='lead'>
//         Пока у задачи нет интерфейсов. Прикрепите несколько, чтобы увидеть, какой из них лучше всего решит поставленную задачу
//     </p>
// }

export default MainPage;