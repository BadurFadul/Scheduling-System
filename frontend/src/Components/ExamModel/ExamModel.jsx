import React from 'react';
import css from './ExamModel.module.css';

const ExamModel = ({children, show}) => {
    if(!show) {
        return null;
    }

  return (
    <div className={css.modal}>
        {children}
    </div>
  )
}

export default ExamModel