const Homepage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-white mb-6 text-center">
          Chào mừng! 
        </h1>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <p className="text-white/90 text-xl leading-relaxed text-center">
            Chọn một mục từ menu phía trên để bắt đầu
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
