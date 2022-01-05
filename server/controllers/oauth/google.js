module.exports = {
  post: async (req, res) => {
    try {
      res.status(200).json({ message: 'POST : 구글 로그인 요청!' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};