import React from 'react';
import styled from 'styled-components';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import DOMPurify from 'dompurify';
const ReusableTable = ({ columns, data, handleView, handleEdit, handleDelete }) => {

    // Sécuriser la description
    const createMarkup = (htmlContent) => {
        return {
            __html: DOMPurify.sanitize(htmlContent)
        };
    };
    return (
        <Table>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, columnIndex) => {
                            const cellValue = row[column.accessor];
                            return (
                                <td key={columnIndex}>
                                    {column.accessor === 'image_path' ? (
                                        <img className="image" src={cellValue} alt={row.title} style={{ width: '100px' }} />
                                    ) : column.accessor === 'description' ? (
                                        <div dangerouslySetInnerHTML={createMarkup(cellValue)} />
                                    ) : (
                                        cellValue
                                    )}
                                </td>
                            );
                        })}
                        <td className='actions'>
                            <div className='action_container'>
                                { handleView && <FaEye className='view' onClick={() => handleView(row.id)} />}
                                { handleEdit && <FaEdit className='edit' onClick={() => handleEdit(row.id)} />}
                                { handleDelete && <FaTrash className='delete' onClick={() => handleDelete(row.id)} />}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ReusableTable;

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    margin-top: 20px;
    border-collapse: collapse;
    th, td {
        border: 1px solid #ddd;
        text-align: center;
        font-size: 0.8rem;

    }
    th {
        background-color: #2e6378;
        padding: 8px;

        color: #fff;
    }
    td {
    }
    .image {
        height: 60px;
        object-fit: contain;
    }
    button {
        margin: 0 5px;
        padding: 5px 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background-color: #2e6378;
        color: white;
        transition: background-color 0.3s;
    }
    button:hover {
        background-color: #1e4a5f;
    }
    .actions {
        gap: 10px;
        width: 100px;
    }
    .actions svg {
        cursor: pointer;
        margin-left: 5px;
    
    }
    .action_container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }
    .view {
        color: green;
        font-size: 1.2rem;
    }
    .edit {
        color: #2e6378;
    }
    .delete {
        color: red;
    }
`;
