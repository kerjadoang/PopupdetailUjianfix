import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  // The main container of the screen, centers its content both vertically and horizontally
  container: {
    flex: 1, // Takes up the full height of the screen
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    backgroundColor: '#F5FCFF', // Sets a light blue/white background color
  },

  // Styles for the modal content box
  modalContent: {
    backgroundColor: 'white', // Modal background color
    padding: 22, // Inner padding of the modal
    borderRadius: 12, // Rounds the corners of the modal
    alignItems: 'center', // Centers the content inside the modal
    ...Platform.select({
      ios: {
        shadowColor: '#000', // Shadow color on iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset (position)
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 4, // Blur radius for the shadow
      },
      android: {
        elevation: 5, // Elevation adds shadow on Android
      },
    }),
  },

  // Styles for the close button inside the modal
  closeButton: {
    width: 40, // Width of the close button
    height: 40, // Height of the close button
    borderRadius: 20, // Makes the button circular (half of width/height)
    backgroundColor: '#F5F7F9', // Light grey background color
    alignSelf: 'flex-end', // Aligns the button to the end (right) of the modal
    justifyContent: 'center', // Centers the text inside the button vertically
    alignItems: 'center', // Centers the text inside the button horizontally
  },

  // Styles for the close button text (the "×" symbol)
  closeButtonText: {
    fontSize: 18, // Font size of the close button text
    color: '#868E96', // Grey color for the text
  },

  // Styles for the robot image displayed in the modal
  robotIcon: {
    width: 60, // Width of the image
    height: 60, // Height of the image
    marginBottom: 16, // Space below the image
    resizeMode: 'contain', // Ensures the image scales uniformly within the given width/height
  },

  // Styles for the title text in the modal
  title: {
    marginBottom: 12, // Space below the title
    fontFamily: 'Poppins_600SemiBold', // Uses the Poppins semi-bold font
    fontSize: 24, // Large font size for the title
    lineHeight: 32, // Line height (space between lines if title spans multiple lines)
    textAlign: 'center', // Centers the title text
    color: '#1D252D', // Dark grey color for the title
  },

  // Styles for the descriptive message text in the modal
  message: {
    fontFamily: 'Poppins_400Regular', // Uses the Poppins regular font
    fontSize: 16, // Standard font size for the message
    lineHeight: 24, // Line height for the message text
    letterSpacing: 16 * (1 / 100), // Letter spacing set to 1% of the font size
    textAlign: 'center', // Centers the message text
    color: '#4D545C', // Slightly lighter grey color for the message
    marginBottom: 20, // Space below the message
  },

  // Container for the action buttons at the bottom of the modal
  buttonContainer: {
    flexDirection: 'row', // Arranges buttons in a horizontal row
    justifyContent: 'space-between', // Spreads the buttons apart
    width: '100%', // Buttons take up the full width of the container
    marginTop: 20, // Space above the button container
  },

  // Styles for the "Periksa Ulang" (Review) button
  reviewButton: {
    flex: 1, // Allows the button to expand and fill available space
    paddingVertical: 10, // Padding on the top and bottom
    paddingHorizontal: 16, // Padding on the left and right
    marginRight: 10, // Space to the right of the button (spacing between buttons)
    backgroundColor: '#FFF', // White background color
    borderWidth: 1, // Adds a border around the button
    borderColor: '#0055B8', // Blue border color
    borderRadius: 30, // Rounds the corners of the button
    alignItems: 'center', // Centers text horizontally within the button
    justifyContent: 'center', // Centers text vertically within the button
    ...Platform.select({
      ios: {
        shadowColor: '#000', // Shadow color on iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset (position)
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 4, // Blur radius for the shadow
      },
      android: {
        elevation: 3, // Elevation adds shadow on Android
      },
    }),
  },

  // Styles for the "Kumpulkan" (Submit) button
  submitButton: {
    flex: 1, // Allows the button to expand and fill available space
    paddingVertical: 10, // Padding on the top and bottom
    paddingHorizontal: 16, // Padding on the left and right
    backgroundColor: '#0055B8', // Blue background color
    borderRadius: 30, // Rounds the corners of the button
    alignItems: 'center', // Centers text horizontally within the button
    justifyContent: 'center', // Centers text vertically within the button
    ...Platform.select({
      ios: {
        shadowColor: '#000', // Shadow color on iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset (position)
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 4, // Blur radius for the shadow
      },
      android: {
        elevation: 3, // Elevation adds shadow on Android
      },
    }),
  },

  // Text styles for the "Periksa Ulang" button
  reviewText: {
    color: '#0055B8', // Blue text color to match the border
    textAlign: 'center', // Centers the text
    fontFamily: 'Poppins_600SemiBold', // Uses the Poppins semi-bold font
    fontSize: 16, // Standard font size for button text
    lineHeight: 24, // Line height for button text
    letterSpacing: 16 * (1 / 100), // Letter spacing set to 1% of the font size
  },

  // Text styles for the "Kumpulkan" button
  submitText: {
    color: '#fff', // White text color to contrast with the blue background
    textAlign: 'center', // Centers the text
    fontSize: 16, // Standard font size for button text
    fontFamily: 'Poppins_600SemiBold', // Uses the Poppins semi-bold font
    lineHeight: 24, // Line height for button text
    letterSpacing: 16 * (1 / 100), // Letter spacing set to 1% of the font size
  },
});
