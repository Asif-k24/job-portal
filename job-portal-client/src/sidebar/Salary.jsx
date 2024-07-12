import React from 'react'
import Button from './Button'
import InputField from '../components/InputField'

export default function Salary({ handleChange, handleClick }) {
    return (
        <div className=''>
            <h4 className='text-lg font-medium mb-2'>Salary</h4>
            <div>
                <Button onClickHandler={handleClick} value="" title="Hourly" />
                <Button onClickHandler={handleClick} value="Monthly" title="Monthly" />
                <Button onClickHandler={handleClick} value="Yearly" title="Yearly" />
            </div>

            <div>
                <label className='sidebar-label-container mt-3'>
                    <input
                        type='radio'
                        name='test2'
                        id='test2'
                        value=""
                        onChange={handleChange}
                    />
                    <span className='checkmark'></span>All
                </label>

                <InputField
                    handleChange={handleChange}
                    value={30}
                    title="< 30000k"
                    name="test2"
                />

                <InputField
                    handleChange={handleChange}
                    value={50}
                    title="< 50000k"
                    name="test2"
                />

                <InputField
                    handleChange={handleChange}
                    value={80}
                    title="< 80000k"
                    name="test2"
                />

                <InputField
                    handleChange={handleChange}
                    value={100}
                    title="< 100000k"
                    name="test2"
                />
            </div>

        </div>
    )
}
