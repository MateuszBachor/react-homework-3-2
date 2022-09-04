import React from 'react';
import styles from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

export class Searchbar extends React.Component {
  render() {
    const { submitForm } = this.props;
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={submitForm}>
          <button className={styles.button} type="submit" name="submitBtn">
            <ImSearch />
          </button>
          <input
            className={styles.input}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
