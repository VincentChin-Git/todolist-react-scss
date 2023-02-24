import React, { useEffect, useReducer } from "react";
import { Col, Modal, ModalBody, Row } from "reactstrap";
import CloseBtn from "../components/close_btn";
import Heart from "../components/heart";
import Task from "../components/task";
import ToDo from "../components/todo";
import { Day, Month } from "../utils/global_const";
import { format_date } from "../utils/global_function";

const OUTER = "outer";
const INNER = "inner";

const reducer = (state, action) => {
    switch (action.type) {
        case "set_state":

            return {
                ...state,
                ...action.payload,
            }
        case "toggle_state":
            return {
                ...state,
                [action.statename]: !state[action.statename],
            }
        case "append_state":
            return {
                ...state,
                [action.statename]: [...state[action.statename], action.payload]
            }
        default:
            return state;
    }
}

const initState = {
    // data
    todo_list: [

    ],
    new_listname: "",
    new_taskname: "",

    // control
    modal_newlist: false,
    modal_newtask: false,
    showing_page: OUTER,
    showing_index: 0,
    bg_color1: "#C2C2EC",
    bg_color2: "#FFA3FC",

    liked: false,
}

const toggleState = (statename, dispatch) => {
    dispatch({
        type: "toggle_state",
        statename,
    })
}

const set_state = (payload, dispatch) => {
    dispatch({
        type: "set_state",
        payload
    })
}

const appendState = (statename, dispatch, payload) => {
    dispatch({
        type: "append_state",
        statename, payload
    })
}

const autoHeight = (e) => {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
}

const ToDoList = props => {

    const styleRing = () => {
        let ring = document.querySelector('.ring');
        ring.style.border = "5px solid #D6D6D6";
        let mask = document.querySelector('.mask');
        mask.style.border = "5px solid transparent";
        ring.style.transform = `rotate(45deg)`;
        mask.style.transform = `rotate(45deg)`;

        let sequence = ['borderTop', 'borderRight', 'borderBottom', 'borderLeft'];

        let tasknum = state.todo_list[state.showing_index].todo.length;
        let done = state.todo_list[state.showing_index].todo.reduce((total, curr) => curr.status ? total + 1 : total, 0);
        let done_percent = done / tasknum;
        if (done_percent >= .25) {

            sequence.forEach(elem => {
                if (done_percent >= 0.25) {
                    ring.style[elem] = "5px solid red";
                }

                else if (done_percent < 0.25 && done_percent > 0) {
                    let degree = 360 * done_percent - 45;
                    mask.style[elem] = "5px solid red";
                    mask.style.transform = `rotate(${degree}deg)`;
                }

                done_percent -= .25;

            })
        }

        else {
            let degree = 360 * done_percent + 45;
            mask.style.border = "5px solid #D6D6D6";
            mask.style.borderTop = "5px solid transparent";
            ring.style.border = "5px solid #D6D6D6";

            ring.style.borderLeft = "5px solid red";
            ring.style.transform = `rotate(${degree}deg)`;
        }


    }

    const addNewList = () => {
        if (state.new_listname != "" && confirm('Add new todo list?')) {
            appendState('todo_list', dispatch, {
                title: state.new_listname,
                todo: [],
            });

            toggleState('modal_newlist', dispatch);
            set_state({ new_listname: "" }, dispatch)

        }
    }

    const addNewTask = () => {
        if (state.new_taskname != "" && confirm('Add new task?')) {
            let todo_list = JSON.parse(JSON.stringify(state.todo_list));

            let todo_elem = JSON.parse(JSON.stringify(todo_list[state.showing_index]));
            todo_elem.todo.splice(todo_elem.todo.length, 0, {
                name: state.new_taskname,
                status: 0, date: ""
            });

            todo_list.splice(state.showing_index, 1, todo_elem);
            set_state({ todo_list: todo_list, new_taskname: "" }, dispatch);
            toggleState('modal_newtask', dispatch);
        }
    }

    const checkTask = index => {
        let todo_list = JSON.parse(JSON.stringify(state.todo_list));
        let todo_elem = JSON.parse(JSON.stringify(todo_list[state.showing_index]));
        todo_elem.todo[index].status = !todo_elem.todo[index].status;
        todo_elem.todo[index].date = `${Day[new Date().getDay()]}, ${Month[new Date().getMonth()]} ${format_date(new Date().getDate())}`;
        todo_list.splice(state.showing_index, 1, todo_elem);
        set_state({ todo_list: todo_list }, dispatch);
    }

    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        let background = document.querySelector('body');
        background.style.background = `linear-gradient(${state.bg_color1}, ${state.bg_color2})`;
    }, [state.bg_color1, state.bg_color2])

    useEffect(() => {

        if (state.showing_page == INNER) {
            styleRing();
        }

    }, [state.todo_list])

    return (
        <>

            <header className="d-flex align-items-center mb-2">
                <Heart toggle={() => toggleState('liked', dispatch)} liked={state.liked} />
                {state.showing_page == INNER &&
                    <CloseBtn click={() => set_state({ showing_page: OUTER, showing_index: -1 }, dispatch)} />
                }
            </header>

            {state.showing_page == OUTER ?
                <div className="outer_page">


                    <section className="justify-content-center align-items-center d-flex title">
                        <div className="line-in-flex"></div>
                        <div className="font-weight-bold ml-4">Tasks</div>
                        &nbsp;
                        <div className="mr-4 border-color">Lists</div>
                        <div className="line-in-flex"></div>

                    </section>
                    <section className="">
                        <div className="text-center mb-3">

                            <button className="btn btn_add_list" onClick={() => toggleState('modal_newlist', dispatch)}>
                                <i className="fa fa-plus" />
                            </button>
                        </div>
                        <div className="text-center">Add List</div>
                    </section>
                    <section className="todo_wrapper mb-4">
                        {state.todo_list.map((elem, index) => <ToDo data={elem} key={index} click={() => set_state({ showing_page: INNER, showing_index: index }, dispatch)} index={index} />)}
                    </section>
                </div>
                : ""
            }

            {state.showing_page == INNER &&
                <div className="inner_page">
                    <section className="title_wrapper">
                        <div className="position-relative">
                            <div className="ring" />
                            <div className="mask" />
                        </div>
                        <div>

                            <h2 className="font-weight-bold">{state.todo_list[state.showing_index].title}</h2>
                            <div className="">
                                {state.todo_list[state.showing_index].todo.reduce((total, cur) => cur.status == 1 ? total + 1 : total, 0)}
                                &nbsp;of&nbsp;
                                {state.todo_list[state.showing_index].todo.length}
                                &nbsp;tasks
                            </div>
                            <hr />
                        </div>
                    </section>
                    <section className="tasklist">
                        {state.todo_list[state.showing_index].todo.map((elem, index) =>
                            <Task data={{ ...elem, index }} key={index} click={() => checkTask(index)} />
                        )}
                    </section>
                </div>
            }

            <footer className="mx-4 mt-2 d-flex align-items-center">
                <input type="color" className="mx-2 d-block theme_choose" value={state.bg_color1} onChange={e => set_state({ bg_color1: e.target.value }, dispatch)} />
                <input type="color" className="mx-2 d-block theme_choose" value={state.bg_color2} onChange={e => set_state({ bg_color2: e.target.value }, dispatch)} />
                {state.showing_page == INNER &&
                    <button onClick={() => toggleState('modal_newtask', dispatch)} className="btn-block ml-auto add_item bg_red">
                        <i className="fa fa-plus" />
                    </button>
                }
            </footer>

            <Modal
                // className="modal_responsive"
                isOpen={state.modal_newlist}
                toggle={() => toggleState('modal_newlist', dispatch)}
                size="sm"
                centered={true}
                backdrop={true}
            >
                <ModalBody className="m-2 text-center">
                    <h5 className="font-weight-bold mb-2">New List Name</h5>
                    {/* <hr/> */}
                    <input id="new_listname" className="form-control my-3 mx-auto" autoComplete="new-off" value={state.new_listname} onChange={e => set_state({ new_listname: e.target.value }, dispatch)} />
                    {/* <hr/> */}
                    <button className="btn btn-secondary mr-1" onClick={() => toggleState('modal_newlist', dispatch)}>Cancel</button>
                    <button className="btn btn-success ml-1" onClick={addNewList}>Add</button>
                </ModalBody>
            </Modal>

            <Modal
                className="modal_responsive"
                isOpen={state.modal_newtask}
                toggle={() => toggleState('modal_newtask', dispatch)}
                size="sm"
                centered={true}
                backdrop={true}
            >
                <ModalBody className="m-2 text-center">
                    <h5 className="font-weight-bold mb-2">New Task</h5>
                    {/* <hr/> */}
                    <input id="new_taskname" className="form-control my-3 mx-auto" autoComplete="new-off" value={state.new_taskname} onChange={e => set_state({ new_taskname: e.target.value }, dispatch)} />
                    {/* <hr/> */}
                    <button className="btn btn-secondary mr-1" onClick={() => toggleState('modal_newtask', dispatch)}>Cancel</button>
                    <button className="btn btn-success ml-1" onClick={addNewTask}>Add</button>
                </ModalBody>
            </Modal>

        </>
    )
}

export default ToDoList;