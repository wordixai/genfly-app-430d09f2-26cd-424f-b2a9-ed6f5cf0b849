import { Calculator } from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Calculator App</h1>
      <Calculator />
    </div>
  );
};

export default Index;