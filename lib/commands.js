module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not aviable for ${selector}`);
    }
  },

  isDisabled: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (button) => {
        return button.disabled;
      });
    } catch (error) {
      throw new Error(`Button is not aviable for ${selector}`);
    }
  },
};
