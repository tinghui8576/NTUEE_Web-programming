import React, { Component, useState } from 'react';
import del from "./img/x.png";
import './App.css';

var todo_list =[];
var show_list =[];
var Visible_l = false, Visible_f = false, Clear_Visible = false, Clearing = false;
var UNVisible =false, CVisible = false, ALLVisible = true;
var Num = 0;
var index_l = 0;
var show_flag = false;
class Head extends Component {
  render(){
    return(
      <header className ='todo-app__header'>
        <div className ='todo-app__title'>todos</div>
      </header> 
    );
  }
}

class Input extends  Component {
  constructor(props){
    super(props);
    this.state = {
      inputValue: ""
    }
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(e) {
    e.preventDefault();
    var newItemValue = this.state.inputValue;
    
    if(newItemValue) {
      this.props.adding({newItemValue});
      this.state.inputValue = "";
    }
    if(todo_list.length === 1){
      this.props.show(true, true);
    }
  }
  
  render(){
    return(
      <form ref='form' onSubmit={this.onSubmit}>
        <input 
          ref="i"
          className="todo-app__input" 
          placeholder='What needs to be done?' 
          value={this.state.inputValue}
          onChange={(e)=>{this.setState({inputValue: e.target.value})}}/>
      </form>
        
       );
      
  }
}

class Item extends Component {
  constructor(props) {
    super(props);
    var state =this.props.item.s;
    this.state ={
      Done: state 
    };
    this.todelete = this.todelete.bind(this);
    this.tocomplete = this.tocomplete.bind(this);
  }
  todelete(){
    if (this.state.Done === true)
      this.tocomplete();
    var index = parseInt(this.props.item.index);
    this.props.removing(index);
  }
  tocomplete(){
    
    var index = parseInt(this.props.item.index);
    this.props.completing(index);
    var state = !this.state.Done;
    this.setState({Done: state});
  }
  render(){
    return(
     <li className="todo-app__item">
        <div className="todo-app__checkbox" onClick={this.tocomplete} >
          <input type="checkbox"  onChange={this.tocomplete}
            checked={this.props.item.s} id={this.props.item.index} />
          <label checked={this.props.item.s} />  
        </div>
        
        {!this.props.item.s && <h1 className = "todo-app__item-detail">{this.props.item.t}</h1> }
        {this.props.item.s && <h1 className = "todo-app__item-detail" 
        style={{ textDecoration: 'line-through',
          opacity: '0.5'}}>{this.props.item.t}</h1> }
        
        <img src={del} alt="delete" className="todo-app__item-x" 
          onClick={this.todelete}
        />
      </li>
    );
  }
}

class Lists extends Component {
  render(){
    
    var items = this.props.items.map((t, index) =>{
      return( 
        <Item 
          key ={t.index} 
          item={t}
          index={t.index}
          removing={this.props.removing}
          completing={this.props.completing}
        />
      );
    });
    var show = this.props.show;
    return(
      <>
      {show && <ul className="todo-app__list" id="todo-list">{items}</ul>}
      </>
      
    );
  }
}


class Main extends Component {
  
  constructor(props) {
    super(props);
    this.state ={
      todo_list: todo_list,
      index_l : index_l,
      show_list: show_list,
      show_flag: show_flag
    };
    this.adding = this.adding.bind(this);
    this.removing = this.removing.bind(this);
    this.completing = this.completing.bind(this);
    this.showlist = this.showlist.bind(this);
  }
  adding(item){
    todo_list.push({
      index: index_l,
      t: item.newItemValue,
      s: false
    });
    index_l += 1;
    this.setState({
      todo_list: todo_list,
      index_l: index_l
    });
    this.props.number();
    show_flag = false;
    this.setState({show_flag:show_flag});
  }
  removing(index){
    if (todo_list.length === 1)
      todo_list = [];
    else{
      todo_list.map((ListItem,id) =>{
        if(ListItem.index === index){
          todo_list.splice(id,1);
        }
      })
    }
      
    this.setState({todo_list: todo_list});
    this.props.number();
    if(todo_list.length === 0){
      this.props.show(false,false);
    }
  }
  completing(index){
    var flag = false;
    todo_list.map(ListItem => {
      if(parseInt(ListItem.index) === index){
        ListItem.s = !ListItem.s;
      }
      if(ListItem.s === true)
        flag = true;
    })
    this.props.clear_show(flag);
    this.props.number();
    this.setState({todo_list: todo_list});
    this.showlist(this.props.show_state);
  }
  showlist(show_state){
    show_flag = true;
    this.setState({show_flag:show_flag});
    var all = show_state[0];
    var uncomplete = show_state[1];
    var complete = show_state[2];
    
    if(all === true){
      show_list = todo_list;
      if(show_list.length === 0){
        this.props.show(false, true);
      }
      else
          this.props.show(true, true);
    }
    else if (uncomplete === true){
        var un_list =[];
        todo_list.map(ListItem =>{
          if(ListItem.s === false){
            un_list.push({
              index : ListItem.index,
              t: ListItem.t,
              s: ListItem.s
            })
          }
        })
        show_list = un_list;
        if(show_list.length === 0){
          this.props.show(false, true);
        }
        else
          this.props.show(true, true);
          
    }
    else if (complete === true){
        var com_list = [];
        todo_list.map(ListItem =>{
          if(ListItem.s ===true){
            com_list.push({
              index : ListItem.index,
              t : ListItem.t,
              s : ListItem.s
            })
          }
        
        })
        show_list = com_list;
        if(show_list.length === 0){
          this.props.show(false, true);
        }
        else
          this.props.show(true, true);
    }
    this.setState({show_list : show_list});
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.clearing !== this.props.clearing){
      var li = [];
      todo_list.map(ListItem =>{
        if(ListItem.s ===false){
          li.push({
            index : ListItem.index,
            t: ListItem.t,
            s:ListItem.s
          })
        }
      })
      todo_list = li;
      this.setState({todo_list:todo_list});
      if(todo_list.length === 0){
        this.props.show(false, false);
      }
      else
        this.showlist(this.props.show_state);
    }
    if(prevProps.show_state[0] !== this.props.show_state[0] ||
        prevProps.show_state[1] !== this.props.show_state[1] ||
        prevProps.show_state[2] !== this.props.show_state[2]
      ){
      
      this.showlist(this.props.show_state);
    
    }
  } 
  render(){
    var showing = [];
    if (show_flag === true)
      showing = this.state.show_list;
    else
      showing = this.state.todo_list;
    
    return(
      <section className = "todo-app__main">
          <Input adding={this.adding} show={this.props.show}/>
          <Lists 
          items={showing} removing={this.removing} 
          show={Visible_l} completing={this.completing}/>
      </section>
    );
  }
}

class Total extends Component {
  render(){
    var number = this.props.number;
    return(
      <div className="todo-app__total">{number} left</div>
    );
  }
}

class Buttons extends Component {
  render(){
    
      return(
        <ul className="todo-app__view-buttons">
          <button onClick ={this.props.allshow}>All</button>
          <button onClick={this.props.unshow}>Active</button>
          <button onClick ={this.props.cshow}>Completed</button>
        </ul> );
  }
}

class Clear extends Component {
  render(){
    var clear_show = this.props.clear_show;
      return(
        <div className="todo-app__clean">
          {clear_show && <button onClick ={this.props.clearing}>clear Completed</button>}
        </div>
      );
  }
}

class Foot extends Component {
  render(){
    var show = this.props.show;
    
    return(
      <>
        {
          show &&
          <footer className="todo-app__footer">
          <Total number={this.props.number}/>
          <Buttons unshow={this.props.unshow} allshow={this.props.allshow} cshow={this.props.cshow}/>
          <Clear clearing ={this.props.clearing} clear_show={this.props.clear_show}/>
        </footer>
        }
        
      </>
    );
  }
}

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state ={
      Visible_l: Visible_l,
      Visible_f:Visible_f,
      UNVisible: UNVisible, 
      CVisible: CVisible,
      ALLVisible: ALLVisible,
      Clear_Visible : Clear_Visible,
      Clearing: Clearing,
      Num: Num
    };
    this.number = this.number.bind(this);
    this.show = this.show.bind(this);
    this.unshow = this.unshow.bind(this);
    this.allshow = this.allshow.bind(this);
    this.cshow = this.cshow.bind(this);
    this.clear_show = this.clear_show.bind(this);
    this.clearing = this.clearing.bind(this);
  }
  show(li_s, f_s){
    if(li_s === true)
      Visible_l = true;
    else
      Visible_l = false;
    if(f_s === true)
      Visible_f = true;
    else
      Visible_f = false;  
    this.setState({
      Visible_l: Visible_l,
      Visible_f:Visible_f
    });
  }
  clear_show(flag){
    if (flag === true)
      Clear_Visible = true;
    else
      Clear_Visible = false;
    this.setState({Clear_Visible : Clear_Visible});
  }
  number(){
    Num = 0;
    todo_list.forEach(element => {
      if(element.s === false)
        Num += 1;
    });
    
    this.setState({Num: Num});
  }
  unshow(){
    UNVisible = true;
    ALLVisible = false;
    CVisible = false;
    this.setState({ UNVisible: UNVisible});
  }
  allshow(){
    UNVisible = false;
    ALLVisible = true;
    CVisible = false;
    this.setState({ ALLVisible: ALLVisible});
  }
  cshow(){
    UNVisible = false;
    ALLVisible = false;
    CVisible = true;
    this.setState({ CVisible: CVisible});
  }
  clearing(){
    Clearing = !Clearing;
    this.setState({ Clearing: Clearing});
  }
  render(){
    return(
      <div className = 'todo-app__root'>
        <Head />
        <Main show={this.show} clearing={Clearing} clear_show={this.clear_show} number ={this.number} show_state={[ALLVisible,UNVisible, CVisible]}/>
        <Foot show={Visible_f} clearing={this.clearing} number ={Num} clear_show={Clear_Visible} unshow={this.unshow} allshow={this.allshow} cshow={this.cshow}/>
      </div>
    );
  }
}


export default Layout;
