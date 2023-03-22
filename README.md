# Frontend Repo for Interview

This code can still be cleaned up by a lot but I think it's an okay place to start building things. Couple things to note here.

1. In a real app, I would further break down these different steps into it's own Folder, that way we can scope the components needed for that specific step.
  a) The component that has the folder name would ultimately be responsible for the Layout of things, however I did not demonstrate this here as there's not much that goes on in a single component. 
2. All constants live in one File. Ideally, we would break these up into it's own files and break them up by which onboarding Step it occurs from. 
3. The use of '_' character behind every action might not be the best naming convention for real world application but it was an easy way to create consistency in my codebase. 
4. Ideally would've liked to create a wrapper for axios, that way we can define middleware, set up options, and define retry strategies in place but it definitely wasn't needed for this project.
5. If the application ever grows bigger, I'd eventually break the redux store up into different slices as well but for this purpose, only having one centralized store did everything for me. 