import React from 'react'
import { serialize } from 'v8';
import data from './generated.json';

export interface ListProps {
   persons: any;
}
 
 export interface ListState {
   search: any;
 }
 
 function compareValues(key: any, order: string) {
   return function innerSort(a: any, b: any) {
     if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
       return 0;
     }
 
     const varA = (typeof a[key] === 'string')
       ? a[key].toUpperCase() : a[key];
     const varB = (typeof b[key] === 'string')
       ? b[key].toUpperCase() : b[key];
 
     let comparison = 0;
     if (varA > varB) {
       comparison = 1;
     } else if (varA < varB) {
       comparison = -1;
     }
     return (
       (order === 'desc') ? (comparison * -1) : comparison
     );
   };
 }
 
 

class Table extends React.Component<ListProps, ListState> {
    constructor(props: ListProps) {
       super(props) 
       this.state = { 
          search: []
       }
       this.handleChange = this.handleChange.bind(this);
       this.sortBy = this.sortBy.bind(this);
    }
    
    sortBy(key: any, direction: string){  
       this.setState({
         search: this.props.persons.sort(compareValues(key, direction))
       })
       console.log(this.state.search)
     }
        
    componentDidMount() {
      this.setState({
        search: this.props.persons
      })
    }
  
    componentWillReceiveProps(nextProps: ListProps) {
      this.setState({
        search: nextProps.persons
      })
    }
  
    renderTableData() {
        return this.state.search.map((persons: any, index: any) => {
           const { id, name, gender,company, email, isActive, picture } = persons
           return (
              <tr key={id}>
                 <td> {id}</td>
                 <td>{name}</td>
                 <td>{gender}</td>
                 <td>{company}</td>
                 <td>{email}</td>
                 <td>{isActive}</td>
                 <td><img src = {picture}/></td>
              </tr>
           )
        })
     }

     renderTableHeader() {
        let header = Object.keys(this.props.persons[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}
              <i className = "arrow up" onClick ={() => this.sortBy(key, 'asc')}/>
              <i className = "arrow down" onClick ={() => this.sortBy(key, 'desc')}/> 
					</th>
        })
     }

     handleChange(e: any) {
      let currentList=[];
      let newList=[];
      if(e.target.value!=="")
      {
        currentList=this.props.persons
        newList=currentList.filter((name: any) => {
          const lc=name['name'].toLowerCase();
          const filter=e.target.value.toLowerCase();
          return lc.includes(filter)
        })
       // console.log(newList);
      } else
      {
        newList=this.props.persons
      }
      this.setState({
        search: newList
      })
  
    }
      render() {
        return (           
           <div>
              <div className="search">
                  <input type="text" className="searchTerm" placeholder="Search table..." onChange={this.handleChange}/>
             </div>   
             <div className = 'table'>         
              <table id='persons'>
                 <tbody>
                    <tr>{this.renderTableHeader()}
                    </tr>
                    {this.renderTableData()}
                 </tbody>
              </table>
              </div> 
           </div>
        )
     }
 }
 
 export default Table