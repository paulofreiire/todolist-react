import React from 'react';
import './App.css';
import ListItems from './components/List'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {faCheck} from '@fortawesome/free-solid-svg-icons'

library.add(faTimes)
library.add(faCheck)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            itemsSearch: [],
            currentItem: {
                text: '',
                key: '',
                done: false,
            },
            searchText: ''

        }
        this.addItem = this.addItem.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setUpdate = this.setUpdate.bind(this);
    }

    addItem(e) {
        e.preventDefault();
        const newItem = this.state.currentItem;
        if (newItem.text !== "") {
            const items = [...this.state.items, newItem];
            this.setState({
                items: items,
                currentItem: {
                    text: '',
                    key: '',
                    done: false
                }
            })
        }
    }

    handleInput(e) {
        this.setState({
            currentItem: {
                text: e.target.value,
                key: Date.now()
            }
        })
    }

    handleChange(e) {
        e.preventDefault();
        const searchText = e.target.value
        const items = this.state.items
        if (searchText !== "") {
            var itemsSearch = items.filter(item =>
              item.text.substring(0, searchText.length) === searchText
            )
        }
        this.setState({
            itemsSearch: itemsSearch,
            searchText: searchText
        })
    }

    setUpdate(key) {
        console.log("items:" + this.state.items);
        const items = this.state.items;
        items.map(item => {
            if (item.key === key) {
                item.done = !item.done
            }
        })
        this.setState({
            items: items
        })
    }

    render() {
        return (
            <div className="App">
                <header>
                    <form id="to-do-form" onSubmit={this.addItem}>
                        <input type="text" placeholder="Adicionar Tarefa" value={this.state.currentItem.text}
                               onChange={this.handleInput}/>
                        <button type="submit">Inserir</button>
                    </form>
                    <ListItems items={this.state.searchText.length > 0 ? this.state.itemsSearch : this.state.items} setUpdate={this.setUpdate}/>
                    <div id="to-do-form" className="search">
                        <input type="text" placeholder="Pesquisar Tarefa" value={this.state.searchText}
                               onChange={this.handleChange}/>
                        <button>Inserir</button>
                    </div>
                </header>
            </div>
        );
    }
}


export default App;
