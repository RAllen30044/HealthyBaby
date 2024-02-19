# General use Guidlines

This site was created with busy parents in mind. As we go on with
our busy days, we do not always have the time to keep track of the
care that is given to our children. Insert Healthy Baby, a place
where you can easily save your child care history were anyone who
logs in can have an understanding of what care there has been
thoughout the day.

If you choose to sign up to this site, You must add a child to your
profile. If you do not add a child you will not be able to
continue to the site untill you do so.

Each time the you have finished using the site, we recommend
that you log out of the site. If you do not, the last page of
the site will remain active until you do so.

## Using Npm run seed

If you choose to run npm run seed in the terminal, please keep these things in mind while trying to execute the app.

1. There are 4 staticly created profiles that will not change. You can find the profiles at the top of the db.json file within the profile array.  
   If you do want to change the username and or password manually just keep one rule in mind. No spaces in the username or password.

2. This site is not built with someone tinkering with the source code in mind so if you do tinker with the code,
   and something breaks, localstorage.clear() has to be apart of the debugging process because the localStorage
   is a major part of how this websites runs at this time. Also you may have to log ou and log back is
   and refreash to page to see update data from npm run seed.

3. Using npm run seed will give you data to work with but some of the data may seem illogical depending on the catagory.
   Npm run seed is meant to give you usable data not necessarily to make the most sense of the date in each catagory.
