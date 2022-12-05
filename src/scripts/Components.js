import { getMinDate, daysDiff, getTimeAgo } from './utils';
const rootContainer = document.querySelector('#root');

const getHeader = () => {
  return `<nav id="navbar">
                <h1 id="page-title" draggable="true">Todo List</h1>
                <input id="search-box" type="text" placeholder="Search Card"/>
                <button class="add-list-button">+ Add List</button>
            </nav>`;
};

const getDueDateProps = (dueDate) => {
  const daysLeft = daysDiff(dueDate);
  let text = '';
  let color = '';
  if (daysLeft === -1) {
    text = 'Overdue';
    color = 'gray';
  } else if (daysLeft === 0) {
    text = 'Due Today';
    color = 'red';
  } else if (daysLeft === 1) {
    text = 'Due Tommorow';
    color = 'red';
  } else if (daysLeft >= 2 && daysLeft < 7) {
    text = `Due in ${daysLeft} days`;
    color = 'orange';
  } else if (daysLeft === 7) {
    text = 'Due in a week';
    color = 'orange';
  } else {
    text = `Due in ${daysLeft} days`;
    color = 'green';
  }
  return {
    element: `<span class="due-date"><strong style="color:${color};">${text}</strong></span>`,
    color: color,
  };
};

const getCard = (
  { id, title, description, dueDate, isFavoriate, createdAt },
  listId
) => {
  return `<div class="card-container" cardId=${id} draggable="true" >
                <div class="card-header">
                    <span class="card-title">
                        ${title}
                    </span>
                    <div class="card-button-container">
                      <button class="favourite-button" cardid='${id}' listId='${listId}' title='Favourite'>
                      <i class='${
                        isFavoriate ? 'fas fa-star' : 'far fa-star'
                      }'></i>
                      </button>
                      <button class="delete-card-button"  cardid='${id}' listId='${listId}' title='Delete Cart'>
                      <i class="far fa-trash-alt"></i>
                      </button>
                    </div>
                </div>
                <p class="card-description">
                    ${description}
                </p>
                <p class="card-footer">
                  <span class="created-ago">
                  Created ${getTimeAgo(new Date(createdAt))} ago
                  </span>
                  ${getDueDateProps(dueDate).element}
                </p>

            </div>`;
};

const getModal = (type = 'List', listId = '') => {
  return `<div id='${type}-modal-container' class='modal'>
                <div class="modal-title">
                    Add ${type}
                </div>
                <div class="modal-body">
                    <label>
                        Title
                    </label>
                    <input type="text" id="title-input" placeholder="Enter Title" />
                    ${
                      type === 'Card'
                        ? `<label>
                            Description
                        </label>
                        <textarea type="text" id="description-input" rows="6" placeholder="Enter description"></textarea>`
                        : ``
                    }
                    ${
                      type === 'Card'
                        ? `<label>
                            Due Date
                        </label>
                        <input type="date" id="due-date-input" name="trip-start" min="${getMinDate()}">`
                        : ``
                    }
                </div>
                <div class="modal-footer">
                    <button class="cancel-modal-button" listid='${listId}'>Cancel</button>
                    <button class="add-modal-button" listid='${listId}'>Add</button>
                </div>
            </div>`;
};

const getFilters = () => {
  return `<div class="sortby-container">
            <div class="filter-container">
              <div>
                <label for="sort-filter">Sort By:</label>
                <select name="sort-filter" id="sort-filter">
                  <option value="due-date" selected>Due Date</option>
                  <option value="name">Name</option>
                  <option value="created-at">Created At</option>
                </select>
              </div>
              <div>
                <label for="sort-order-filter">Order:</label>
                <select name="sort-order-filter" id="sort-order-filter">
                  <option value="ascending" selected>Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </div>
            </div>`;
};

export { getHeader, rootContainer, getCard, getModal, getFilters };
