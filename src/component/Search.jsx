import React from 'react';
import styled from 'styled-components'
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const StyledSearchInputWrapper = styled('div')`
     margin: 20px;
  `;

const Search = ({setSearchTerm, setSearchStartDate, setSearchEndDate}) => {
    const onChangeSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    const onChangeDate = (dateArr, dateStringArr) => {
        console.log(dateStringArr)
        setSearchStartDate(dateStringArr[0]);
        setSearchEndDate(dateStringArr[1]);
    }

    return (
        <StyledSearchInputWrapper>
            <p>내용 검색: <input type='text' onChange={onChangeSearchTerm}/></p>
            <p>
                작성일 검색:
                <RangePicker onChange={onChangeDate}/>
            </p>
        </StyledSearchInputWrapper>
    )
}

export default Search;
