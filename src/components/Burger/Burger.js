import React from 'react'
import classes from '../Burger/Burger.css'
import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    let burgerIngredients = Object.keys(props.ingredients);
    let burgerIngredientsAdded = burgerIngredients.map((ik)=>{
        return [...Array( props.ingredients[ik] )].map((_,index) => {
            return <BurgerIngredient type={ik} key={ik + index}></BurgerIngredient>
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if (burgerIngredientsAdded.length === 0) {
        burgerIngredientsAdded = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            { burgerIngredientsAdded }
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
};

export default burger;