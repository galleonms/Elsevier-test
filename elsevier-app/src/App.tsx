import React from 'react';
import './App.css';
import data from './generated.json';
import Table from './Table';

export interface Props {
  data?: any
}

export interface State {
  data: any
}

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state={
      data: data
    }
  }
  
    public render() {
    return (
      <div className="App">
        <h1>
        Elsevier testing app 
        </h1> 
       <Table persons = {this.state.data}></Table>
      </div>
    );
  }
}

export default App;
