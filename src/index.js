/** @jsx virtualDOM */

import "./styles.css";

function virtualDOM(type, props, ...args){
    const children = [].concat(...args);
    return {
        type,
        props,
        children
    };
}

function createDOMElement(virtualNode) {
    //Para elementos funcionales
    if (typeof virtualNode.type === 'function') {
        //Hacemos return porque sino seguimos ejecutando la función y peta
        return createDOMElement(virtualNode.type(virtualNode.props));
    };

    const element = document.createElement(virtualNode.type);
    
    const props = virtualNode.props;
    if(props){
        Object.keys(props).map( key => {
            if (key === 'className') {
                element.classList.add(virtualNode.props['className']);
            } else {
                element.setAttribute(key, props[key])
            }
        })
    }

    virtualNode.children.forEach(child => {
        if(typeof child === 'string') {
            return element.appendChild(document.createTextNode(virtualNode.children));
        }

        return element.appendChild(createDOMElement(child));
    });
    
    
    return element;
}



const testElement = <h1 className='title' style='font-weight: bold;'>Test Header</h1>;
const FunctionalComponent = ({text}) => <h2>{text}</h2>;
const elementoLista = <ul><li>Elemento 1</li><li>Elemento 2</li><li>Elemento 3</li><li>Elemento 4</li></ul>;
const FuctionalList = () => (
    <ul><li>Elemento 1</li><li>Elemento 2</li><li>Elemento 3</li><li>Elemento 4</li></ul>
);


document.body.appendChild(createDOMElement(testElement));
document.body.appendChild(createDOMElement(<FunctionalComponent text='Probando componente funcional'></FunctionalComponent>));
document.body.appendChild(createDOMElement(<FunctionalComponent text='Probando el mismo componente funcional de nuevo'></FunctionalComponent>));
document.body.appendChild(createDOMElement(elementoLista));
document.body.appendChild(<FuctionalList/>);

