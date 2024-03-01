# Healthy Baby

This site was created with busy parents in mind. As we go on with
our busy days, we do not always have the time to keep track of the
care that is given to our children. Insert Healthy Baby, a place
where you can easily save your child care history were anyone who
logs in can have an understanding of what care there has been
thoughout the day.

## General use Guidelines

If you choose to sign up to this site, You must add a child to your
profile. If you do not add a child you will not be able to
continue to the site untill you do so.

Each time the you have finished using the site, we recommend
that you log out of the site. If you do not, the last page of
the site will remain active until you do so.

## User Guidelines

To start using the app/site please sign up by clicking the sign up link on the top right corner. Then add a child. You must enter your child information as you best know it. You must enter all information fields to continue. Once you enter the site you will start at the home page where you can select one out of 4 different categories. With each different catagory, you will be able to record the history of each time you child does the event that is recorded. It will be a database that will keep these histories so that the parents and caregivers will be able to track the daily upkeep of the children by date. The time can be recored well.

### Catagory Use

In website use you can find the categories by clicking the three stripes in the top right corner to see the drop down menu. To Add a child you can link that is shown with this same drop down menu.

In mobile use the categories will be tabs that you can select.
While the Home, About Us, Edit Profile, and Log Out will be in the dropdown menu.

1. Feeding
   Feeding has 3 sub catagories. Bottle feeding, freast feeding and Eating. Eating is a toggle that indicate that the child will now be eating solid foods and will turn of the baby food mode.

- Bottle feeding - the oz and the ounces disgarded can be recorded
- Breast feeding - The time that the baby was feeding on the breast can be recorded.
- Eating - The food and drink can be recorded.

2. Diapers
   In this category you can record the type of diaper the the baby has soiled whether wet or poop. The poop type will have three consistancy types soft, solid and pellets. The wet tyhpe of diaper will default to a wet consistancy.

3. Napping
   In this category page you can record how long of a nap the child had.

4. Illness
   In this category you can record the the symptoms of your child, the medicine taken and the amoubnt of medicine taken

To Select a different child profile, simply click the switch child button at the top of the page. And select the child profile you wish to change to.

The edit a specific child information. Select the child by using the the select a child guidelines explained proviously, then click the edit button thaty is below the child information. It will take you to the edit child page where you can change the childs information that you have selected.

To edit your profile, select the Edit profile link that will be at the top right of the page or in the dropdown menu in the mobile version. On the Edit profile page you may change your caregiver and password but not your username at this time.   

## Developer Guidelines

### Using Npm run seed

If you choose to run npm run seed in the terminal, please keep these things in mind while trying to execute the app.

- There are 4 staticly created profiles that will not change. You can find the profiles at the top of the db.json file within the profiles array. If you do want to change the username and or password manually just keep one rule in mind. No spaces in the username or password.

- This site is not built with someone tinkering with the source code in mind. If you do tinker with the code, and something breaks, adding localstorage.clear() in app.tsx, or where evere you can clear the local storage, has to be apart of the debugging process because the localStorage
  is a major part of how this websites runs at this time. Also you may have to log out, log back in and refresh to page to see updated data from npm run seed.

- Using npm run seed will give you data to work with but some of the data may seem illogical depending on the catagory. Npm run seed is meant to give you usable data not necessarily to make the most sense of the date in each catagory.
