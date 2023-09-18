# Table generator app

### You can view a live demo of this project at the following URL:
#### https://euphonious-taffy-38f364.netlify.app/

---

### To run this project on your local machine, follow these steps:
1. Clone the repository to your local machine using the following command:
### `git clone https://github.com/Ainika-Kos/table-generator-app.git`
2. Once the project is cloned and opened in your code editor, open a new terminal window and run the following command to install the project dependencies:
### `npm install`
3. After the node_modules folder is successfully installed, start the development server with the following command:
### `npm start`
4. You can now access the project in your web browser at the following URL
### `http://localhost:3000`
5. To run the project's tests, execute the following command
### `npm test`

---

### Table Generator main requirements
1. Only the first table can be filled in, while the others can only be edited
2. The "Copy" button for a table means that its current state is copied, and a copy of it appears below that table
3. The "Delete Table" button deletes the table (the original table cannot be deleted)
4. Editing and deleting columns (data is changed, and the entire row is deleted only in the table where the manipulations are performed)
5. In the input form, placeholders should disappear when focused
6. Form 1 and 2 are responsible for adding records to the table, and their placement on the page can be arbitrary
7. If something is typed in form 1, it is updated in form 2 as well
8. The modal form appears when you click on "Edit" (the data in forms 1 and 2 should not be affected)
9. The placement of the modal form is arbitrary
10. Changes can only be saved after clicking the "Agree" button
11. After saving the changes, the modal form closes

---

### Figma design
https://www.figma.com/file/8Ot36TB6OL1dS12zMLoIgp/%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8?node-id=0%3A1&mode=dev