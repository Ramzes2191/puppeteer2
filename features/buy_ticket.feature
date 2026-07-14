Feature: Buy ticket

    Scenario: Should buy ticket on film
    Given User on "/index.php" page
    When User click buy ticket
    Then User sees message "Вы выбрали билеты"

    Scenario: Should inactive button when uncheck chair
    Given User on "/index.php" page
    When User click check - uncheck chair
    Then User sees inactive button

    Scenario: Should active button when check chair
    Given User on "/index.php" page
    When User click check chair
    Then User sees active button