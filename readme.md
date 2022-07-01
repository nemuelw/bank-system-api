# Bank System API

## Requirements 
   NodeJS (npm) \
   MongoDB

## Set-Up
1. Clone this repository .
2. Navigate to the project directory .
3. Run "npm install" .
4. Run "node setup.js" \
(Ensure that MongoDB is running before performing step 4)

## Running 
1. On the terminal, within the project directory, run "npm run start" .
 
### This will start the API on port 8000 .
You can now start interacting with the API's various endpoints .

## NOTE:
   Running the setup.js file simply adds the admin credentials to the database . \
      usrnm: admin \
      passwd: password123 

## Next Steps   
   Next steps would involve adding tellers, and afterwards the customers as well . \
   With both tellers and some customers added to the system, you can then :
   - Perform deposits to bank accounts
   - Transfer money from one account to another
   - Withdraw money from an account
   - View a list of the logs regarding when a teller logs in and logs out (Admin only)
