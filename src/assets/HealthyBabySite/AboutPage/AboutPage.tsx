import "./AboutPage.css";

export const AboutPage = () => {
  return (
    <>
      <h1>About Us</h1>
      <div className="aboutContainer">
        <div className="AboutTheSite">
          <h3 className="aboutText">
            Welcome to the Healthy Baby site where parents can have a place to
            know what care their child(ren) has had throughout each day.
          </h3>
        </div>
        <div className="purpose">
          <h2>Purpose</h2>
          <p>
            This site was created with busy parents in mind. As we go on with
            our busy days, we do not always have the time to keep track of the
            care that is given to our children. Insert Healthy Baby, a place
            where you can easily save your child care history were anyone who
            logs in can have an understanding of what care there has been
            throughout the day.
          </p>
        </div>
        <div className="siteRules">
          <h2>Site Guidelines to Optimize Experience</h2>
          <p>
            There are a few guidelines to follow to ensure that we can optimize
            your experience using the website.
          </p>
          <ol>
            <p>
              <li>
                When you sign up to this site, just remember that the
                authentication is not a true secured authentication. Therefore,
                when signing up to the we do not recommend using the full name
                of people, rather the first names or nicknames to ensure
                identity concealment.
              </li>
            </p>
            <p>
              <li>
                After you sign up to this site, You must add a child to your
                profile. If you do not add a child you will not be able to
                continue to the site until you do so.
              </li>
            </p>
            <p>
              <li>
                Each time the you have finished using the site, we recommend
                that you log out of the site. If you do not, the last page of
                the site will remain active until you do so.
              </li>
            </p>
          </ol>
        </div>
        <div className="userGuide">
          <h2>How to use the site</h2>

          <p>
            To start using the app/site please sign up by clicking the sign up
            link on the top right corner. Then add a child. You must enter your
            child information as you best know it. You must enter all
            information fields to continue. Once you enter the site you will
            start at the home page where you can select one out of 4 different
            categories. With each different category, you will be able to record
            the history of each time you child does the event that is recorded.
            It will be a database that will keep these histories so that the
            parents and caregivers will be able to track the daily upkeep of the
            children by date. The time can be recorded well.
          </p>

          <p>
            In website use, you can find the categories by clicking the three
            stripes in the top right corner to see the drop down menu. To Add a
            child you can link that is shown with this same drop down menu. In
            mobile use the categories will be tabs that you can select. While
            the Home, About Us, Edit Profile, and Log Out will be in the
            dropdown menu.
          </p>
        </div>
        <div className="categoryUse">
          <h2>Category Use</h2>
          <p>
            In website use you can find the categories by clicking the three
            stripes in the top right corner to see the drop down menu. To Add a
            child you can link that is shown with this same drop down menu. In
            mobile use the categories will be tabs that you can select. While
            the Home, About Us, Edit Profile, and Log Out will be in the
            dropdown menu.
          </p>
          <ol className="categoriesList">
            <li>
              <h3>Feeding</h3>
              <p>
                Feeding has 3 sub catagories. Bottle feeding, Breast feeding and
                Eating. Eating is a toggle that indicate that the child will now
                be eating solid foods and will turn of the baby food mode.
              </p>
              <ul className="feedingList">
                <li>
                  <p>
                    Bottle feeding - the total ounces and the ounces discarded
                    can be recorded
                  </p>
                </li>
                <li>
                  <p>
                    Breast feeding - The time that the baby was feeding on the
                    breast can be recorded.
                  </p>
                </li>
                <li>
                  <p>Eating - The food and drink can be recorded.</p>
                </li>
              </ul>
            </li>
            <li>
              <h3>Diapers</h3>
              <p>
                In this category you can record the type of diaper the the baby
                has soiled whether wet or poop. The poop type will have three
                consistency types soft, solid and pellets. The wet type of
                diaper will default to a wet consistency.
              </p>
            </li>
            <li>
              <h3>Napping</h3>
              <p>
                In this category page you can record how long of a nap the child
                had.
              </p>
            </li>
            <li>
              <h3>Illness</h3>
              <p>
                In this category you can record the the symptoms of your child,
                the medicine taken and the amount of medicine taken
              </p>
            </li>
          </ol>
        </div>
        <div className="selectAChild">
          <h2>Switch Child Profile</h2>
          <p>
            To Select a different child profile, simply click the switch child
            button at the top of the page. And select the child profile you wish
            to change to.
          </p>
        </div>
        <div className="editAChild">
          <h2>Edit Child </h2>
          <p>
            The edit a specific child information. Select the child by using the
            the select a child guidelines explained previously, then click the
            edit button that is below the child information. It will take you
            to the edit child page where you can change the child's information
            that you have selected.
          </p>
        </div>
        <div className="editProfile">
          <h2>Edit Profile </h2>
          <p>
            To edit your profile, select the Edit profile link that will be at
            the top right of the page or in the dropdown menu in the mobile
            version. On the Edit profile page you may change your caregiver and
            password but not your username at this time.
          </p>
        </div>
        <div className="closing">
          <p>
            I hope you enjoy our site and thank you for visiting Healthy Baby 😇
          </p>
        </div>
      </div>
    </>
  );
};
