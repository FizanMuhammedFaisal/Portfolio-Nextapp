import CodePreview from '@/components/code/CodePreview'

interface Card {
  content: React.ReactNode
  description: String
  controls?: React.ReactNode
  code?: string
}
const ExampleCard = ({ content, description, controls, code }: Card) => {
  return (
    <div className=" p-4 rounded-lg">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full flex justify-center">{content}</div>
        <p className="text-sm text-gray-300 text-center">{description}</p>
        {controls && <div className="lg:w-1/2 w-full md:w-3/4">{controls}</div>}
        {code && (
          <div className="lg:w-1/2 w-full  md:w-3/4 ">
            <CodePreview code={code} />
          </div>
        )}
      </div>
    </div>
  )
}
export default ExampleCard
