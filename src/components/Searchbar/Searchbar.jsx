import {
  SearchbarWindow,
  SearchForm,
  SearchFormBtn,
  SearchLabel,
  SearchInput,
} from './Searchbar.styled';
import { toast } from 'react-toastify';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {
    setSearchQuery(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Enter image name');
      return;
    }
    onSubmit(searchQuery);
    resetForm();
  };

  const resetForm = () => {
    searchQuery('');
  };

  return (
    <SearchbarWindow>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <SearchLabel>Search</SearchLabel>
        </SearchFormBtn>
        <SearchInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarWindow>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
