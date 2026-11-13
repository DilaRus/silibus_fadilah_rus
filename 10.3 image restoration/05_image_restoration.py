from scipy.signal import convolve2d as conv2
from skimage import color, data, restoration
import matplotlib.pyplot as plt
import numpy as np

# Setup a random number generator for adding 'noise' later
rng = np.random.default_rng()

# Prepare the image: Load the astronaut and convert it to Grayscale (Black & White)
# Restoration math is easier to learn on one color channel rather than three (RGB).
astro = color.rgb2gray(data.astronaut())

# Create a "Blur" filter (Point Spread Function - PSF)
# This is a 5x5 matrix where every value is 1/25. It averages pixels together.
psf = np.ones((5, 5)) / 25

# Apply the blur to the image using 'convolution'
# This simulates a camera being out of focus.
astro = conv2(astro, psf, 'same')

# Add "Grain" or "Static" (Random Noise)
# We multiply a standard normal distribution by the image's intensity.
astro += 0.1 * astro.std() * rng.standard_normal(astro.shape)

# The Magic Step: Wiener Deconvolution
# This algorithm tries to reverse the blur while ignoring the random noise.
# 'unsupervised' means it automatically guesses how much noise is in the image.
deconvolved, _ = restoration.unsupervised_wiener(astro, psf)

# Visualization: Create a side-by-side comparison
fig, ax = plt.subplots (nrows=1, ncols=2, figsize=(8, 5), sharex=True, sharey=True)

plt.gray() # Tell matplotlib to show images in grayscale

# Display the Blurry/Noisy version
ax[0].imshow(astro, vmin=deconvolved.min(), vmax=deconvolved.max())
ax[0].axis('off')
ax[0].set_title('Blurred & Noisy')

# Display the Cleaned version
ax[1].imshow(deconvolved)
ax[1].axis('off')
ax[1].set_title('Restored (Wiener)')

fig.tight_layout()
plt.show()