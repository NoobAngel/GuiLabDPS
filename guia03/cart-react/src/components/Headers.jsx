import { useState } from 'react';
import React from "react";

export const Headers = ({
    allProducts,
    setAllProducts,
    total,
    countProducts,
    setCountProducts,
    setTotal,
}) => {
    const [active, setActive] = useState(false);
    const onDeleteProduct = product => {
        const results = allProducts.filter(
            item => item.id !== product.id
        );
        setTotal(total - product.price * product.quantity);
        setCountProducts(countProducts - product.quantity);
        setAllProducts(results);
    };
    const onCleanCart = () => {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);
    };

    return (
        <header>
            <h1>Tienda de Libros</h1>
            <div className="container-icon">

                <div className="container-cart-icon" onClick={() => setActive(!active)}>
                    <img src="https://e7.pngegg.com/pngimages/833/426/png-clipart-shopping-cart-icon-shopping-cart-black-design.png" alt="carrito" className="icon-cart" />


                    <div className="count-products"></div>
                    <span id="contador-productos">0</span>
                </div>
            </div>

            <div className={`container-cart-products ${active ? '' : 'hidden-cart'
                }`}
            >
                {allProducts.length ? (
                    <>
                        <div className='row-product'>
                            {allProducts.map(product => (
                                <div className='cart-product'
                                    key={product.id}>
                                    <div className='info-cart-product'>
                                        <span className='cantidad-productocarrito'>
                                            {product.quantity}
                                        </span>
                                        <p className='titulo-productocarrito'>
                                            {product.title}
                                        </p>
                                        <span className='precio-productocarrito'>
                                            ${product.price}
                                        </span>
                                    </div>
                                    <img
                                        src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                                        alt="cerrar"
                                        className="icon-close"
                                        onClick={() => onDeleteProduct(product)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className='cart-total'>
                            <h3>Total:</h3>
                            <span className='total-pagar'>${total}</span>
                        </div>
                        <button className='btn-clear-all'
                            onClick={onCleanCart}>
                            Vaciar Carrito
                        </button>
                    </>
                ) : (
                    <p className='cart-empty'>El carrito está vacío</p>
                )}

            </div>

        </header >);
}
