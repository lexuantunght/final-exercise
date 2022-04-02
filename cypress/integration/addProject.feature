Feature: Add Project Page
    Scenario: Invalid data
        Given I open PIM Tool
        When I go to add project page
        Then I see the url is /create-project
        And I don't input and click create button
        And I see error dialog
    Scenario: Valid data
        Given I open PIM Tool
        When I go to add project page
        Then I input valid data
        And I click add and see successful message
        When I go back project list
        Then I see the project that I have recently added