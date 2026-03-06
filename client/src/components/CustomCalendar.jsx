import React, { useState } from 'react';
import './CustomCalendar.css';

const CustomCalendar = ({ selectedDate, onDateSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate || new Date()));

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const isSameDay = (d1, d2) => {
        return d1 && d2 && d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
    };

    return (
        <div className="custom-calendar-widget">
            <div className="calendar-header-custom">
                <button onClick={prevMonth}>{'<'}</button>
                <span>{monthNames[currentMonth.getMonth()]}</span>
                <button onClick={nextMonth}>{'>'}</button>
            </div>

            <div className="calendar-body-custom">
                <div className="days-of-week-custom">
                    {daysOfWeek.map(day => <span key={day}>{day}</span>)}
                </div>

                <div className="days-grid-custom">
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="day-cell-custom empty"></div>
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNumber = i + 1;
                        const cellDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber);
                        const isSelected = selectedDate && isSameDay(cellDate, selectedDate);

                        return (
                            <button
                                key={dayNumber}
                                className={`day-cell-custom ${isSelected ? 'active-day-custom' : ''}`}
                                onClick={() => onDateSelect(cellDate)}
                            >
                                {dayNumber}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="calendar-footer-custom">
                <button className="calendar-btn-custom" onClick={() => onDateSelect(null)}>View All Events</button>
            </div>
        </div>
    );
};

export default CustomCalendar;
