"use client";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 max-w-md px-6">
        <div className="text-5xl">⚠</div>
        <h2 className="text-lg font-semibold text-foreground">页面出现错误</h2>
        <p className="text-sm text-muted-foreground/60">
          {error.message || "未知错误"}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          重试
        </button>
      </div>
    </div>
  );
}
