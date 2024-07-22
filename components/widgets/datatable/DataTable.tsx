"use client";

import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import './table.css';
import { categoryRowSignal } from '@/controller/row_actions';

type prop = {
    title:string;
    addBtnText?:string;
    data:any[];
    columns:{label:string, value:string}[];
   
}

const DataTable = (prop:prop) => {
    return (
        <div className='my-5'>

<section className='flex justify-between items-center mb-5'>
<h1 className="text-2xl font-bold">{prop.title}</h1>
<button className='btn'> <MdAdd className='text-lg'/> Add {prop.addBtnText}</button>
</section>


{
    prop.data.length<1?<div>No Data Found</div>:

            <table className="table">
                <thead>
                    <tr>
                        <th>Sl.</th>
                        {prop.columns.map((col)=>{
                            return <th key={col.value}>{col.label}</th>
                        })}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {prop.data.map((row,index)=>{
                        return (
                            <tr key={row.id}>
                                <td>{index+1}</td>
                                {prop.columns.map((col,index2)=>{
                                                            const key1 = col.value.split('.')[0];
                                                            const key2 = col.value.split('.')[1];
                                                            const finalValue = key2? row[key1][key2]: row[key1];
                                    return <td key={index2}>{finalValue}</td>
                                })}

<td className='flex gap-x-2 justify-center'>
<button className='actionbtn bg-blue-600 hover:bg-blue-800'
onClick={()=>{
    categoryRowSignal.value = {
        action:"edit",
        data:row,
        
    };
}}
><MdEdit/></button>
<button className='actionbtn bg-red-600 hover:bg-red-800'
onClick={()=>{
    categoryRowSignal.value = {
        action:"edit",
        data:row,
        
    };
}}
><MdDelete/></button>

</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>}
        </div>
    );
}

export default DataTable;