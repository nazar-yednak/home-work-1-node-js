const {program} = require('commander')

const { listContacts,
    getContactById,
    removeContact,
    addContact
} = require('./contact')

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
     const contactList = await listContacts()
     console.table(contactList)
      break;

    case "get":
     const oneContact = await getContactById(id)
     console.table(oneContact)
      break;

    case "add":
    const newContact = await addContact(name, email, phone);
    console.table(newContact)
      break;

    case "remove":
      const removeContact = await removeContact(id)
    console.table(removeContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv)