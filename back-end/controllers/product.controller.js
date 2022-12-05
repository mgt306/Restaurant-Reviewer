//Made with the help and tutorial of https://www.telerik.com/blogs/how-to-implement-standard-search-using-react in accordance with the requirements of the CS department at NYU

const searchRes = async (req, res, next) => {
    try {
      const { q } = req.query;
      const restaurant = await Product.find({ name: { $regex: q, $options: 'i' } });
    
      if (restaurant.length < 1) throw new ErrorHandler(404, 'No restaurant found');
  
      res.status(201).json({
        status: 'success',
        message: 'restaurant has been found successfully',
        restaurant,
      });
    } catch (error) {
      next(error);
    }
  };