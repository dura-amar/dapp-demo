// This is an example test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const { upgrades, ethers, run } = require("hardhat");


// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.

describe(
  "Workshop constract", function () {
    // Mocha has four functions that let you hook into the the test runner's
    // lifecycle. These are: `before`, `beforeEach`, `after`, `afterEach`.

    // They're very useful to setup the environment for tests, and to clean it
    // up after they run.

    // A common pattern is to declare some variables, and assign them in the
    // `before` and `beforeEach` callbacks.
    let WorkshopChain;
    let hardhatWorkshop;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
      // Get the ContractFactory and Signers here.
      WorkshopChain = await ethers.getContractFactory("WorkshopChain");
      [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

      // To deploy our contract, we just have to call Election.deploy() and await
      // for it to be deployed(), which happens onces its transaction has been
      // mined.
      hardhatWorkshop = await WorkshopChain.deploy();

      // We can interact with the contract by calling `hardhatElection.method()`
      await hardhatWorkshop.deployed();
    });

    // You can nest describe calls to create subsections.
    describe("Deployment", function () {
      // `it` is another Mocha function. This is the one you use to define your
      // tests. It receives the test name, and a callback function.

      // If the callback function is async, Mocha will `await` it.
      it("Should set the right owner", async function () {
        // Expect receives a value, and wraps it in an assertion objet. These
        // objects have a lot of utility methods to assert values.

        // This test expects the owner variable stored in the contract to be equal
        // to our Signer's owner.
        expect(await hardhatWorkshop.owner()).to.equal(owner.address);
      });


      it("Create  a workshop", async function () {
        // Organizer can register the workshop
        await expect(hardhatWorkshop.connect(addr1).addWorkshop("uir-hash", "title", 12121212, 121212121, "venue", "time", 100)).to.be.revertedWith("You are not registered as organizer.");



        await hardhatWorkshop.connect(addr1).addOrganizer("name", "about");
        hardhatWorkshop.connect(addr1).addWorkshop("uir-hash", "title", 12121212, 121212121, "venue", "time", 100);

      });


      it("Get current workshops.", async function () {
        // participants can get the current workshops
        await expect(hardhatWorkshop.connect(addr2).getCurrentWorkshops()).to.be.revertedWith("You are not registered as participant.");

        await hardhatWorkshop.connect(addr2).addParticipant("name","email");


        await expect(hardhatWorkshop.connect(addr2).getCurrentWorkshops());


      });

      it("Get my workshops.", async function () {
        // participants can get the current workshops
        await expect(hardhatWorkshop.connect(addr2).getMyWorkshops()).to.be.revertedWith("You are not registered as organizer.");

        await hardhatWorkshop.connect(addr2).addOrganizer("name","about");


        await expect(hardhatWorkshop.connect(addr2).getMyWorkshops());

      });


    });

  });
