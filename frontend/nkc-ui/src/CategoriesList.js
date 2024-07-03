import React from 'react';

const CategoriesList = (props) => {
    const { categories, removeCategory, editCategory } = props;

    return (
        <div>
            <h1> Categories List </h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map((category, i) => {
                        return (
                            <tr key={category._id}>
                                <td>{i + 1}</td>
                                <td>{category.name}</td>
                                <td>
                                    <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                    <button onClick={() => removeCategory(category._id, category.name)}>Remove</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriesList;
