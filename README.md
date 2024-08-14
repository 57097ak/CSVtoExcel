# CSV to Excel Table with Row Selection

## Overview

This project provides a React component for displaying tabular data with the ability to select rows and export the selected rows to an Excel file. The table is styled using Tailwind CSS, and the conversion to Excel is handled by the `xlsx` library.

## Features

- Display tabular data with a clean and responsive design.
- Select individual rows using checkboxes.
- Export selected rows to an Excel file (.xlsx format).
- Includes a button to convert the selected rows to Excel.

## Installation

To get started with this project, follow these steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/CSVtoExcel.git
    cd CSVtoExcel
    ```

2. **Install Dependencies**

    Make sure you have `npm` or `yarn` installed. Then, install the required dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the Application**

    Start the development server:

    ```bash
    npm start
    # or
    yarn start
    ```

    Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Code Explanation

### Table Component

The `Table` component displays a table with the following functionalities:

- **Row Selection:** Each row has a checkbox that allows the user to select or deselect rows.
- **Export to Excel:** A button at the top allows the user to export the selected rows to an Excel file.

### Key Functions

- **`handleRowSelect(rowIndex)`**
  
  This function toggles the selection of a row based on its index. It updates the state to include or exclude the row index from the list of selected rows.

- **`exportToExcel()`**

  This function converts the selected rows into an Excel file. It uses the `xlsx` library to generate and download the file.

### Dependencies

- **`react`** - The core library for building the user interface.
- **`tailwindcss`** - A utility-first CSS framework for styling.
- **`xlsx`** - A library for reading and writing Excel files.

## File Structure

- **`src/`** - Contains the source code for the React components.
  - **`Table.js`** - The main component that renders the table and handles row selection and export.
  - **`App.js`** - The root component that includes the `Table` component.
- **`public/`** - Contains static assets like `index.html`.
- **`tailwind.config.js`** - Tailwind CSS configuration file.
- **`package.json`** - Project metadata and dependencies.

## Example Usage

Here is an example of how to use the `Table` component:

```jsx
import React from 'react';
import Table from './Table';

const data = [
  { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
  { name: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
  // Add more rows as needed
];

function App() {
  return (
    <div className="p-4">
      <Table data={data} />
    </div>
  );
}

export default App;
